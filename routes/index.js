import { Router } from "express";
import cardRouter from "./card.routes.js";
import authRouter from "./auth.routes.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/card", cardRouter);

export default router;
