import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import * as cardService from "../services/card.services.js";
import schedulerAlgorithm from "./algorithm.js";

export const getDeckCard = catchAsync(async (req, res) => {
  const card = await cardService.getCardById(req.params.cardId);
  res.status(httpStatus.OK).send(card);
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

export const reviewDeckCard = catchAsync(async (req, res) => {
  let card = await cardService.getCardById(req.params.cardId);

  card = card.toJSON();
  card = { ...card, ...req.body };
  const data = schedulerAlgorithm(card);

  const update_values = {
    ...req.body,
    ...data,
  };

  const updated_card = await cardService.updateCardById(card.id, update_values);
  res.status(httpStatus.OK).send(updated_card);
});

export const updateDeckCard = catchAsync(async (req, res) => {
  const card = await cardService.updateCardById(req.body);
  res.status(httpStatus.OK).send(card);
});
