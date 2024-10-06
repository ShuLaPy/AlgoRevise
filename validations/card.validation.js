import Joi from "joi";
import { objectId } from "./custom.validation.js";

const createCard = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    question_link: Joi.string().required(),
    platform: Joi.string().required(),
    tags: Joi.array().items(Joi.string().required()),
    resources: Joi.array().items(Joi.string()),
    Notes: Joi.string(),
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

export { createCard, getCard, reviewCard };
