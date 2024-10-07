import { Schema, model, SchemaTypes } from "mongoose";

const historySchema = new Schema(
  {
    user_id: SchemaTypes.ObjectId,
    timestamp: {
      type: Date,
      default: new Date(),
    },
    time_taken: Number,
    question_id: SchemaTypes.ObjectId,
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
