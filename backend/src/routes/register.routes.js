import { Router } from "express";
import { userRegister } from "../controllers/register.controllers.js";
const router = Router();
router.post("/", userRegister);

export default router;
