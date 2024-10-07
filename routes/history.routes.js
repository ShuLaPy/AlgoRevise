import { Router } from "express";
import { historyController } from "../controllers/index.js";
import validate from "../middlewares/validate.js";
import * as historyValidation from "../validations/history.validation.js";
import auth from "../middlewares/auth.js";

const historyRouter = Router();

historyRouter.get(
  "/progress/:question_id",
  auth(),
  validate(historyValidation.getQuestionProgress),
  historyController.getQuestionProgress
);

export default historyRouter;
