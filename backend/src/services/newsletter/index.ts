import { Router } from "express";
import { sendNewsletter } from "./controllers/sendNewsletter.controller";
import { validate } from "../../middleware/validation";
import { campaignInput } from "./validation/newsletter.validation";

const newsletterRouter = Router();

newsletterRouter.post("/", validate(campaignInput),sendNewsletter);

export default newsletterRouter;
