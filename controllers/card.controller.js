import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import * as cardService from "../services/card.services.js";
import schedulerAlgorithm from "./algorithm.js";
import pick from "../utils/pick.js";
import { historyServices } from "../services/index.js";

export const getDeckCard = catchAsync(async (req, res) => {
  const card = await cardService.getCardById(req.params.cardId);
  res.status(httpStatus.OK).send(card);
});

export const getAllDeckCards = catchAsync(async (req, res) => {
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await cardService.getAllCards({}, options);
  res.status(httpStatus.OK).send(result);
});

const createHistoryRecord = async (card) => {
  const data = {
    user_id: card.user_id,
    time_taken: card.last_time_taken,
    question_id: card.id,
    tags: card.tags,
    grade: card.grade,
  };
  await historyServices.createRecord(data);
};

export const createDeckCard = catchAsync(async (req, res) => {
  let user_card = req.body;
  user_card = {
    ...user_card,
    user_id: req.user.id,
    review_count: 0,
    ease_factor: 2.5,
    interval: 1,
    last_review_date: new Date(),
  };

  const data = schedulerAlgorithm(user_card);

  user_card = {
    ...user_card,
    ...data,
  };

  const card = await cardService.createCard(user_card);
  await createHistoryRecord(card);
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
  await createHistoryRecord(updated_card);
  res.status(httpStatus.OK).send(updated_card);
});

export const updateDeckCard = catchAsync(async (req, res) => {
  const card = await cardService.updateCardById(req.body);
  res.status(httpStatus.OK).send(card);
});

export const getDueToday = catchAsync(async (req, res) => {
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  let start = new Date();
  start.setHours(0, 0, 0, 0);
  let end = new Date();
  end.setHours(23, 59, 59, 999);

  const filter = { next_review_date: { $gte: start, $lte: end } };
  const cards = await cardService.getAllCards(filter, options);
  res.status(httpStatus.OK).send(cards);
});

export const getPending = catchAsync(async (req, res) => {
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  let start = new Date();
  start.setHours(0, 0, 0, 0);

  const filter = { next_review_date: { $lt: start } };
  const cards = await cardService.getAllCards(filter, options);
  res.status(httpStatus.OK).send(cards);
});
