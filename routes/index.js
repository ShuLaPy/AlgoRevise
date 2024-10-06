import { Router } from "express";
import cardRouter from "./card.routes.js";
const router = Router();

router.use("/card", cardRouter)

export default router;