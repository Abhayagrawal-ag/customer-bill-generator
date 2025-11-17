import User from "../models/user.models.js";

const passwordResetcodeVerify = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: " code are required" });
    }
    const user = await User.findOne({
      passwordResetCode: code,
    });
    if (!user) {
      return res.status(400).json({ message: "wrong code  " });
    }
    if (user.passwordResetCodeExpiry < Date.now()) {
      return res.status(400).json({ message: "code has expired" });
    }
    user.passwordResetCode = undefined;
    user.passwordResetCodeExpiry = undefined;
    await user.save();
    return res
      .status(200)
      .json({ message: "Now, you can change your password" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
export default passwordResetcodeVerify;
