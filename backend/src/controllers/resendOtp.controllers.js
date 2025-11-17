import User from "../models/user.models.js";
import sendVerificationCode from "../utils/sendEmail.js";
const resendOtpVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.isVerified) {
      res.status(400).json({ message: "email already verified" });
    }
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = newCode;
    user.verificationCodeExpires = Date.now() + 2 * 60 * 1000;
    await user.save();
    await sendVerificationCode(user.email, newCode);
    return res.status(200).json({ message: "new otp is sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
export default resendOtpVerify;
