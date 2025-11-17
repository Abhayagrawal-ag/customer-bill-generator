import { Router } from "express";
import verifyEmail from "../controllers/emailVerify.controllers.js";
const router = Router();
router.post("/", verifyEmail);
export default router;
