import Joi from "joi";
import { objectId } from "./custom.validation.js";

const createCard = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    question_link: Joi.string().required(),
    platform: Joi.string().required(),
    tags: Joi.array().items(Joi.string().required()),
    resources: Joi.array().items(Joi.string()),
    note: Joi.string(),
    revision: Joi.boolean().required(),
    difficulty: Joi.string().required().valid("easy", "medium", "hard"),
    grade: Joi.string().required().valid("easy", "good", "hard", "again"),
  }),
};

const getCard = {
  params: Joi.object().keys({
    cardId: Joi.string().custom(objectId),
  }),
};

const reviewCard = {
  params: Joi.object().keys({
    cardId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    grade: Joi.string().required().valid("easy", "good", "hard", "again"),
  }),
};

const getAllDeckCards = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export { createCard, getCard, reviewCard, getAllDeckCards };
