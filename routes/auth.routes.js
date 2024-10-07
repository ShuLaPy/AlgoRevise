import { Router } from "express";
import { authController } from "../controllers/index.js";
import validate from "../middlewares/validate.js";
import * as authValidation from "../validations/auth.validation.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
authRouter.post("/login", validate(authValidation.login), authController.login);

export default authRouter;
