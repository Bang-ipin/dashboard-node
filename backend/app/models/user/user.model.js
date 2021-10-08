import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const UserModel = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: { type: String, required: [true, "Please provide a username"] },
      email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
      },
      resetpasswordToken: { type: String },
      resetpasswordExpire: { type: Date },
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  schema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  schema.methods.getSignToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  schema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetpasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.resetpasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
  };

  const User = mongoose.model("users", schema);
  return User;
};
export default UserModel;
