import { Router } from "express";
import userLogin from "../controllers/login.controllers.js";
const router = Router();
router.post("/", userLogin);
export default router;
