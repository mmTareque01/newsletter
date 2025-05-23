import { Router } from "express";
import {
  createNewsletterType,
  deleteNewsletterType,
  getNewsletterTypeList,
  updateNewsletterType,
} from "./controllers";
import { validate } from "../../../middleware/validation";
import { newsletterTypeSchema } from "./validation";

const typeRouter = Router();

typeRouter.post("/", validate(newsletterTypeSchema), createNewsletterType);
typeRouter.get("/", getNewsletterTypeList);
typeRouter.put("/", validate(newsletterTypeSchema), updateNewsletterType);
typeRouter.delete("/", deleteNewsletterType);

export default typeRouter;
