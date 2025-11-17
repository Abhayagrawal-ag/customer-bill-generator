import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",   // official SMTP server of Gmail;
  port: 587,
  secure: false,
  auth: {
    user: "imabhay098@gmail.com",
    pass: "tdem zumf mxzn bkbe"
  }
})
export default transporter;