// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../libs/errors";
import { verifyAccessToken, verifyRefreshToken } from "../libs/tokenService";
import { response } from "../response-config/response";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  console.log({ authHeader, token });
  //   const token = '';
  try {
    const validatedUser = verifyAccessToken(token || "");

    if (!validatedUser) {
      return next(new CustomError("ER401", "Unauthorized user"));
    } else {
      req.user = validatedUser as UserType;
      next();
    }
  } catch (error) {
    console.log({ error });

    /**
     * check cookies for refresh token (done)
     * if refresh token is present, verify it
     * if valid, generate new access token and set it in response header
     * if invalid, return 401 Unauthorized
     * if no refresh token, return 401 Unauthorized
     */

    if (error instanceof CustomError) {
      // console.trace()
      console.log(1)
      const token = req.cookies.refreshToken;
      if (!token) {
        //  console.trace()
          console.log(2)
        return next(error);
      }
       console.log(token)
      const tokenInfo = verifyRefreshToken(token);
      console.log({ tokenInfo });
      if (!tokenInfo) {
        //  console.trace()
          console.log(3)
        return next(error);
      }
      //  console.trace()
        console.log(4)
      req.user = tokenInfo.user as UserType;
      res.setHeader("authorization", `Bearer ${tokenInfo.accessToken}`);
      response.setRefreshToken(res, tokenInfo.refreshToken);
      next();

      // return next(error);
    } else {
       console.trace()
      next(error);
    }
  }
};
