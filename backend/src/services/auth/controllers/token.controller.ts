import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "../../../libs/tokenService";

export const token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) res.status(401).json({ message: "No token" });
    // }

    // const payload = verifyRefreshToken(token) as any;

    const user = verifyRefreshToken(token) ;
    // if(user){}
    const newAccessToken = ''//generateAccessToken(user);

    // response.setRefreshToken(res,)
    response.ER200(res, { accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};
