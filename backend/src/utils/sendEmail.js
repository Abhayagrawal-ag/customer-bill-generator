import transporter from "./nodemailer.js";
const sendVerificationCode = async (email, verificationCode) =>{
  try {
    const response = await transporter.sendMail({
      from: ' "Receipty", <imabhay098@gmail.com>',
      to: email,
      subject: "verify your email",
      text: "verify your email",
      html: verificationCode
    })
    console.log("email send successfully", response);
  } catch (error) {
    console.log("Email error", error);
  }
}
export default sendVerificationCode;
