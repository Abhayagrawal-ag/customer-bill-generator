import {Router} from "express";
import {customerDetails} from "../controllers/customer.controllers.js";
import { getAllCustomers } from "../controllers/customer.controllers.js";
import tokenVerify from "../middlewares/tokenVerify.js";

const router = Router();
router.post("/" , customerDetails)

router.get("/:shopId", tokenVerify, getAllCustomers);

export default router;