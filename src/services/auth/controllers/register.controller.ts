import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { hashPassword } from "../../../others/hash";
import { createUserRepo } from "../repository/register.repository";
import { generateAccessToken, generateRefreshToken } from "../../../others/tokenService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    // Create new subscriber
    const hashed: string = await hashPassword(password);
    const newUser = await createUserRepo({
      email,
      firstName,
      lastName,
      password: hashed,
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // refreshTokens.push(refreshToken);

    response.ER201(
      res,
      { accessToken, refreshToken },
      "User Registered successfully"
    );
  } catch (error) {
    next(error);
  }
};
