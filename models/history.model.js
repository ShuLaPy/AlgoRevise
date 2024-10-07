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
    grade: {
      type: String,
      enum: {
        values: ["easy", "good", "hard", "again"],
        message: "{VALUE} is not supported",
      },
    },
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
