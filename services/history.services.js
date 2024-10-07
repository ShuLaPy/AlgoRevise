import mongoose from "mongoose";
import { History } from "../models/index.js";

export const createRecord = async (data) => {
  return History.create(data);
};

export const getQuestionProgress = async (question_id, user_id) => {
  const query = [
    {
      $match: {
        user_id: new mongoose.Types.ObjectId(user_id),
        question_id: new mongoose.Types.ObjectId(question_id),
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field
        date: { $dateToString: { format: "%b %d", date: "$timestamp" } }, // Format the timestamp
        grade: 1,
        time_taken: 1,
      },
    },
  ];
  console.log(query);
  return History.aggregate(query);
};
