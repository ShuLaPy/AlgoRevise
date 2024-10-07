import httpStatus from "http-status";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

export const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(userBody);
};

export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
