import db from '../../models/index.js'
import ErrorResponse from '../../utils/errorResponse.js';
import sendEmail from '../../utils/SendEmail.js'
import crypto from "crypto";

const User   = db.user

const sendToken  = async (user,statusCode, res) => {
    const token = await user.getSignToken();
    res.status(statusCode).json({ success:true,token})
}

const AuthController  = {

    Register : async (req,res,next) => {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            published: req.body.published ? req.body.published : false
        };
        try {
            const user = await User.create(data);
            sendToken(user,201,res);
        } catch (error) {
            next(error);
        }
    },
    Login : async (req,res,next) => {
        const {email,password } = req.body ;
        if (!email || !password  ){
            return next(new ErrorResponse("please provide email & password"))
        }
        try {
            const user = await User.findOne({email}).select("+password");
            if(!user){
                return next(new ErrorResponse("Invalid Credentials"))
            }
            const isMatch = await user.matchPassword(password);
            
            if(!isMatch){
                return next(new ErrorResponse("Invalid Credentials"))
            }

            sendToken(user,200,res);
            
        } catch (error) {
            res.status(500).json({
                success:false,
                error:error.message
            })
        }
    },

    Forgotpassword : async (req,res,next) => {
        const {email} = req.body;
        if (!email){
            return next(new ErrorResponse("Please provide email"))
        }
        try {
            const user = await User.findOne({email});
            
            if(!user){
                return next(new ErrorResponse("Email could not be sent",404))
            }
            const resetToken    = user.getResetPasswordToken();
            await user.save();

            const resetUrl      = `http://localhost:5000/passwordreset/${resetToken}`;
            const message       = `You have requested a password reset
                                    <p>Plesae go to thi link to reset your password</p>
                                    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
                                    `
            try {
                await sendEmail({
                    to:user.email,
                    subject:"Password Reset Request",
                    text:message
                });
                res.status(200).json({success:true,data:"Email Sent"})
            } catch (error) {
                user.resetpasswordToken     = undefined;
                user.resetpasswordExpire    = undefined;
                await user.save();
                return next(new ErrorResponse("Email could not be send",500))
            }
        } catch (error) {
            next(error)
        }
    },
    Resetpassword : async (req,res,next) => {
        const resetpasswordToken     = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

        try {
            const user = await User.findOne({
                resetpasswordToken,
                resetpasswordExpire: { $gt: Date.now() }
            })
            if(!user){
                return next(new ErrorResponse("Invalid reset token",400))
            }
            user.password               = req.body.password;
            user.resetpasswordToken     = undefined;
            user.resetpasswordExpire    = undefined;
            await user.save();

            res.status(201).json({
                success:true,
                data:"Password reset success"
            });
        } catch (error) {
            next(error)
        }

    }
   
}
export default AuthController