import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { createUserRepo } from "../repository/create.user.repository";
import { hashPassword } from "../../../libs/hash";

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

    response.ER201(res, newUser, "User Registered successfully");
  } catch (error) {
    next(error);
  }
};
