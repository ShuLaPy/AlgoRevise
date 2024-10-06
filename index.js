import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import httpStatus from "http-status";

import router from "./routes/index.js";
import ApiError from "./utils/ApiError.js";
import config from "./config/config.js";
import logger from "./config/logger.js";
import { errorConverter, errorHandler } from "./middlewares/error.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  app.listen(3000, () => {
    console.log(`Listening to port ${3000}`);
  });
});
