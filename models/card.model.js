import { Schema, model } from "mongoose";
import { toJSON, paginate } from "./plugins/index.js";

const deckCardSchema = new Schema(
  {
    question: String,
    question_link: String,
    platform: String,
    tags: [String],
    resources: [String],
    note: String,
    revision: Boolean,
    status: {
      type: String,
      enum: {
        values: ["new", "learning", "review"],
        message: "{VALUE} is not supported",
      },
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "{VALUE} is not supported",
      },
    },
    review_count: Number,
    ease_factor: {
      type: Number,
      default: 2.5,
    },
    interval: {
      type: Number,
      default: 1,
    },
    grade: {
      type: String,
      enum: {
        values: ["easy", "good", "hard", "again"],
        message: "{VALUE} is not supported",
      },
    },
    last_review_date: {
      type: Date,
      default: new Date(),
    },
    next_review_date: Date,
  },
  {
    timestamps: true,
  }
);

deckCardSchema.plugin(toJSON);
deckCardSchema.plugin(paginate);

const card = model("card", deckCardSchema);

export default card;
