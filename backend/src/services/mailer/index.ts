import { Router } from "express";
import { validate } from "../../middleware/validation";
import { mailerValidation } from "./validation/mailer.validation";
import { sendFromGmail } from "./controllers/sendFromGmail.controller";

const newsletterRouter = Router();

newsletterRouter.post("/", validate(mailerValidation), sendFromGmail);

export default newsletterRouter;
