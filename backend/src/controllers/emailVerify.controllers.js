import User from "../models/user.models.js";
const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({
      verificationCode: code,
    });
    if (!user) {
      return res.status(400).json({ message: "wrong code" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "user is already verified" });
    }
    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({ message: "code has expired" });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();
    return res.status(201).json({ message: "OTP verification successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export default verifyEmail;
