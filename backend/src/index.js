import connectDb from "./db/connect.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import PORT from "./config/appConfig.js";
import Register from "./routes/register.routes.js";
import emailVerification from "./routes/emailVerify.routes.js";
import Login from "./routes/login.routes.js";
import ResendOtp from "./routes/resendOtp.routes.js";
import PasswordReset from "./routes/passwordReset.routes.js";
import PasswordVerify from "./routes/passwordVerify.routes.js";
import PasswordChange from "./routes/passwordChange.routes.js";
import ManageProducts from "./routes/product.routes.js";
import ProductSale from "./routes/productSale.routes.js";
import ShopDetails from "./routes/shop.routes.js";
import CustomerDetails from "./routes/customer.routes.js"
import  GetAllShopId  from "./routes/shop.routes.js"
import GenerateBill from "./routes/pdf.routes.js";
import GetAllCustomers from "./routes/customer.routes.js"
const app = express();

dotenv.config(); // for reading of .env file
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies
  }),
);

// routes
app.use("/api/register", Register);
app.use("/api/verifyEmail", emailVerification);
app.use("/api/login", Login);
app.use("/api/resendotp", ResendOtp);
app.use("/api/passwordresetcode", PasswordReset);
app.use("/api/passwordresetcodeverify", PasswordVerify);
app.use("/api/passwordchange", PasswordChange);
app.use("/api/manageproduct", ManageProducts);
app.use("/api/productsell", ProductSale);
app.use("/api/shopdetails", ShopDetails);
app.use("/api/customerdetails" , CustomerDetails)



app.use("/api/getallshopsids", GetAllShopId)
app.use("/api/getallcustomers", GetAllCustomers)
app.use("/api/generatebill", GenerateBill)

// server listen
app.listen(PORT, () => {
  connectDb();
  console.log(`server is running at port: ${PORT}`);
});
