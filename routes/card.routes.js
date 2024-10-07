import { Router } from "express";
import { cardController } from "../controllers/index.js";
import validate from "../middlewares/validate.js";
import * as cardValidation from "../validations/card.validation.js";
import auth from "../middlewares/auth.js";

const cardRouter = Router();

cardRouter.get("/", auth(), cardController.getAllDeckCards);

cardRouter.get("/duetoday", cardController.getDueToday);
cardRouter.get("/pending", cardController.getPending);

cardRouter.get(
  "/:cardId",
  validate(cardValidation.getCard),
  cardController.getDeckCard
);

cardRouter.patch(
  "/review/:cardId",
  validate(cardValidation.reviewCard),
  cardController.reviewDeckCard
);

cardRouter.post(
  "/",
  validate(cardValidation.createCard),
  cardController.createDeckCard
);

cardRouter.patch("/", cardController.updateDeckCard);

export default cardRouter;
