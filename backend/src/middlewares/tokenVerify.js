import jwt from "jsonwebtoken";

const tokenVerify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: "Unauthorised or invalid token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export default tokenVerify;
