import {Router} from "express";
import manageProduct from "../controllers/product.controllers.js";
const router = Router();
router.post("/", manageProduct);


export default router