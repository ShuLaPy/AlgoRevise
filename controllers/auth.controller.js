import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import {
  authServices,
  userServices,
  tokenServices,
} from "../services/index.js";

export const register = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body);
  const tokens = await tokenServices.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.loginUserWithEmailAndPassword(
    email,
    password
  );
  const tokens = await tokenServices.generateAuthTokens(user);
  res.send({ user, tokens });
});
