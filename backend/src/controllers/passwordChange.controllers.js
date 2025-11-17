import User from "../models/user.models.js";
import bcrypt from "bcrypt";
const passwordChange = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
     if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "password length must be atleast 8 characters" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords do not match" });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export default passwordChange;
