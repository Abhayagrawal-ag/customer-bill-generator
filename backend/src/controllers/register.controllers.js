import User from "../models/user.models.js";
import validator from "validator";
import bcrypt from "bcrypt";
import sendVerificationCode from "../utils/sendEmail.js";
export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res.status(400).json({ message: "please enter your name" });
    }
    if (!password) {
      return res.status(400).json({ message: "please enter your password" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "email format is wrong" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "password length should be 8 characters" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "user is already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const verificationCodeExpires = new Date(Date.now() + 2 * 60 * 1000);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires,
    });
    await newUser.save();
    await sendVerificationCode(newUser.email, verificationCode);
    return res
      .status(201)
      .json({ message: "user successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
