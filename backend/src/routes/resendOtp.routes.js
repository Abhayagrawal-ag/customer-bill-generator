import { Router } from "express";
import resendOtpVerify from "../controllers/resendOtp.controllers.js";
const router = Router();
router.post("/", resendOtpVerify);
export default router;
