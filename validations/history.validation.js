import Joi from "joi";
import { objectId } from "./custom.validation.js";

const getQuestionProgress = {
  params: Joi.object().keys({
    question_id: Joi.string().custom(objectId),
  }),
};

export { getQuestionProgress };
