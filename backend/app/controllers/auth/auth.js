import db from '../../models/index.js'
import ErrorResponse from '../../utils/errorResponse.js';

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
        await res.send("Forgot Password route");
    },
    Resetpassword : async (req,res,next) => {
        await res.send("Reset Password route");
    }
   
}
export default AuthController