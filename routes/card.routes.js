import { Router } from "express";
import { cardController } from "../controllers/index.js";
import validate from "../middlewares/validate.js";
import * as cardValidation from "../validations/card.validation.js";
import auth from "../middlewares/auth.js";

const cardRouter = Router();

cardRouter.get("/", auth(), cardController.getAllDeckCards);

cardRouter.get("/duetoday", auth(), cardController.getDueToday);
cardRouter.get("/pending", auth(), cardController.getPending);

cardRouter.get(
  "/:cardId",
  auth(),
  validate(cardValidation.getCard),
  cardController.getDeckCard
);

cardRouter.patch(
  "/review/:cardId",
  auth(),
  validate(cardValidation.reviewCard),
  cardController.reviewDeckCard
);

cardRouter.post(
  "/",
  auth(),
  validate(cardValidation.createCard),
  cardController.createDeckCard
);

cardRouter.patch("/", auth(), cardController.updateDeckCard);

export default cardRouter;
