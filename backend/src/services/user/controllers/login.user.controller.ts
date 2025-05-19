import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { createUserRepo } from "../repository/create.user.repository";
import { hashPassword } from "../../../others/hash";
import { loginRepo } from "../repository/login.user.repository";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Create new subscriber
    const authUser = await loginRepo({
      email,
      password,
    });

    

    response.ER201(res, authUser, "User logged in successfully");
  } catch (error) {
    next(error);
  }
};
