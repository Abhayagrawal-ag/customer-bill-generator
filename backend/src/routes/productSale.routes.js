import {Router} from "express";
import productSale from "../controllers/productSale.controllers.js";
const router = Router();
router.post("/", productSale);

export default router;