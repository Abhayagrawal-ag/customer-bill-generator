import {Router} from "express"
import passwordResetcodeVerify from "../controllers/passwordVerify.controllers.js";
const router = Router();
router.post("/", passwordResetcodeVerify);
export default router