import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "../../../others/tokenService";

export const updateSubscriber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    // if (!token || !refreshTokens.includes(token)) {
    //   return res.sendStatus(403);
    // }
    const user = verifyRefreshToken(token);
    const newAccessToken = generateAccessToken({
      email: "",
      firstName: "",
      lastName: "",
    });

    response.ER200(res, { accessToken: newAccessToken, refreshToken: "" });
  } catch (error) {
    next(error);
  }
};
