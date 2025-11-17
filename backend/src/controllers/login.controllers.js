import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "user doesn't exists" });
    }
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email before logging in" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "password doesn't matched, try again with another password",
      });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username }, //paylaod
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true, // client-side js can't access it
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "login successfull",
      userData: {
        _id : user._id
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal server error, please try again later" });
  }
};
export default userLogin;
