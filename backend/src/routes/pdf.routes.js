import {Router} from "express";
const router = Router();
import generateBill from "../controllers/pdf.controllers.js";

router.get("/:customerId", generateBill);
export default router;