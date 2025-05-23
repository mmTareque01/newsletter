import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // res.clearCookie("refreshToken", {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax", // Match what was used when setting
    //   path: "/", // Must match what was used when setting
    //   domain:
    //     process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined,
    // });

    response.setRefreshToken(res, null, 0);

    response.ER200(res, {}, "User logged out successfully");
  } catch (error) {
    next(error);
  }
};
