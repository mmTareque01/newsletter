import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import { createSubscriberRepo } from "../repository/create.subscriber.repository";
import { loginRepo } from "../repository/login.user.repository";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../others/tokenService";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const authUser = await loginRepo({
      email,
      password,
    });

    const accessToken = generateAccessToken(authUser);
    const refreshToken = generateRefreshToken(authUser);

    // refreshTokens.push(refreshToken);

    response.ER200(
      res,
      { accessToken, refreshToken },
      "User logged in successfully"
    );
  } catch (error) {
    next(error);
  }
};
