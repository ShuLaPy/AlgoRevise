import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import * as cardService from "../services/card.services.js";

export const getDeckCard = catchAsync(async (req, res) => {
  const cards = await cardService.getCardById(req.params.cardId);
  res.status(httpStatus.OK).send(cards);
});

export const createDeckCard = catchAsync(async (req, res) => {
  let user_card = req.body;
  user_card = {
    ...user_card,
    review_count: 0,
    ease_factor: 2.5,
    interval: 1,
    last_review_date: new Date(),
  };
  const card = await cardService.createCard(user_card);
  res.status(httpStatus.CREATED).send(card);
});

export const updateDeckCard = catchAsync(async (req, res) => {
  const card = await cardService.updateCardById(req.body);
  res.status(httpStatus.OK).send(card);
});
