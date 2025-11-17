import {Router}  from "express";
import passwordChange from "../controllers/passwordChange.controllers.js";

const router = Router();
router.post("/", passwordChange);
export default router