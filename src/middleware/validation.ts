import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodEffects, ZodError } from "zod";
import { response } from "../response-config/response";

export const validate = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      await schema.parseAsync({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      next();
    } catch (error) {
      //   console.error("Validation error:", error);
      if (error instanceof ZodError) {
        response.ER400(
          res,
          "Validation failed",
          error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          }))
        );
      } else {
        next(error);
      }
      //   next(error);
    }
  };
};
