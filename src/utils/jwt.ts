import jwt from "jsonwebtoken";
import { TokenPayload } from "../types";

interface JwtPayload {
  id: string;
  email: string;
  role: "admin" | "member";
}

export const generateAccessToken = (payload: JwtPayload): string => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error(
      "JWT_ACCESS_SECRET is not defined in environment variables",
    );
  }
  if (!process.env.JWT_ACCESS_EXPIRES_IN) {
    throw new Error(
      "JWT_ACCESS_EXPIRES_IN is not defined in environment variables",
    );
  }
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  } as any);
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error(
      "JWT_REFRESH_SECRET is not defined in environment variables",
    );
  }
  if (!process.env.JWT_REFRESH_EXPIRES_IN) {
    throw new Error(
      "JWT_REFRESH_EXPIRES_IN is not defined in environment variables",
    );
  }
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  } as any);
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error(
      "JWT_REFRESH_SECRET is not defined in environment variables",
    );
  }
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as TokenPayload;
};

export const verifyAccessToken = (token: string): TokenPayload => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error(
      "JWT_ACCESS_SECRET is not defined in environment variables",
    );
  }
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET) as TokenPayload;
};

