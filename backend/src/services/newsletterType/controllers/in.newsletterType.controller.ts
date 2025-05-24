// import { NextFunction, Request, Response } from "express";
// import { response } from "../../../response-config/response";


// export const create = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { title, description } = req.body;

//     // Create new subscriber
//     const newType = await createNewsletterTypeRepo({
//       title,
//       description,
//       userId: req.body.user.id,
//     });

//     response.ER201(res, newType, "Newsletter type created successfully");
//   } catch (error) {
//     next(error);
//   }
// };

