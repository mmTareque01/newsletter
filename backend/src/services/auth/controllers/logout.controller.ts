import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import { createSubscriberRepo } from "../repository/create.subscriber.repository";
import { loginRepo } from "../repository/login.user.repository";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../others/tokenService";

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/auth/refresh", // should match the path where the cookie was set
    });

    response.ER200(res, {}, "User logged out successfully");
  } catch (error) {
    next(error);
  }
};
