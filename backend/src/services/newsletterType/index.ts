import { Router } from "express";
import {
  createNewsletterType,
  deleteNewsletterType,
  getNewsletterTypeList,
  updateNewsletterType,
} from "./controllers";
import { newsletterTypeSchema, updateNewsletterTypeSchema } from "./validation";
import { validate } from "../../middleware/validation";

const typeRouter = Router();

typeRouter.post("/", validate(newsletterTypeSchema), createNewsletterType);
typeRouter.get("/", getNewsletterTypeList);
typeRouter.put(
  "/:id",
  validate(updateNewsletterTypeSchema),
  updateNewsletterType
);
typeRouter.delete("/:id", deleteNewsletterType);

export default typeRouter;
