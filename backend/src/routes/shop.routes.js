import {Router} from "express";
import {shopDetails} from "../controllers/shop.controllers.js";
import { getAllShopIds } from "../controllers/shop.controllers.js";
import tokenVerify from "../middlewares/tokenVerify.js";
const router = Router();
router.post("/", tokenVerify, shopDetails);

router.get("/", tokenVerify, getAllShopIds);
export default router