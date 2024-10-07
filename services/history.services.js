import { History } from "../models/index.js";

export const createRecord = async (data) => {
  return History.create(data);
};
