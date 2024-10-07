import { Router } from "express";
import cardRouter from "./card.routes.js";
import authRouter from "./auth.routes.js";
import historyRouter from "./history.routes.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/card", cardRouter);
router.use("/history", historyRouter);

export default router;
