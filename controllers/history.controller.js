import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { historyServices } from "../services/index.js";

export const getQuestionProgress = catchAsync(async (req, res) => {
  const question_id = req.params.question_id;
  const history = await historyServices.getQuestionProgress(
    question_id,
    req.user.id
  );
  res.status(httpStatus.OK).send(history);
});
