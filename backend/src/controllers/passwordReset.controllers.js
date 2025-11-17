import User from "../models/user.models.js";
import sendVerificationCode from "../utils/sendEmail.js";
const passwordModify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const passwordResetCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const passwordResetCodeExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.passwordResetCodeExpiry = passwordResetCodeExpiry;
    user.passwordResetCode = passwordResetCode;
    await user.save();
    sendVerificationCode(user.email, passwordResetCode);
    return res
      .status(200)
      .json({ message: "password reset code has sent to the email" });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};
export default passwordModify;
