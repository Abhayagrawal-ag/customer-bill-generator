import {Router} from "express"
import passwordModify from "../controllers/passwordReset.controllers.js";
const router = Router();
router.post("/" , passwordModify);
export default router