import { Schema, model, Types } from "mongoose";

const historySchema = new Schema(
  {
    user_id: Types.ObjectId,
    timestamp: Date,
    time_required: Number,
    question_id: Types.ObjectId,
    tags: [String],
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "user_id",
      granularity: "hours",
    },
  }
);

const history = model("history", historySchema);

export default history;
