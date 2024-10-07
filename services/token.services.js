import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config/config.js";
import { userServices } from "./index.js";
import { tokenTypes } from "../config/tokens.js";
import ApiError from "../utils/ApiError.js";
import { Token } from "../models/index.js";
import { add, getUnixTime, toDate } from "date-fns";

export const generateToken = (
  userId,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(expires),
    type,
  };
  return jwt.sign(payload, secret);
};

export const saveToken = async (
  token,
  userId,
  expires,
  type,
  blacklisted = false
) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: toDate(expires),
    type,
    blacklisted,
  });
  return tokenDoc;
};

export const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

export const generateAuthTokens = async (user) => {
  const accessTokenExpires = add(new Date(), {
    minutes: config.jwt.accessExpirationMinutes,
  });
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = add(new Date(), {
    days: config.jwt.refreshExpirationDays,
  });

  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: toDate(accessTokenExpires),
    },
    refresh: {
      token: refreshToken,
      expires: toDate(refreshTokenExpires),
    },
  };
};
