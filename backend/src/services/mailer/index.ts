import { Router } from "express";
import { validate } from "../../middleware/validation";
import { mailerValidation } from "./validation/mailer.validation";
import { sendFromGmail } from "./controllers/sendFromGmail.controller";
import { getEmailSettings } from "./controllers/getEmailSettings";
import { createEmailSettings } from "./controllers/createEmailSettings";
import { emailSettingsValidation } from "./validation/emailSettings.validation";

const emailRouter = Router();

emailRouter.post("/", validate(mailerValidation), sendFromGmail);
emailRouter.get("/settings/", getEmailSettings);
emailRouter.post("/settings/", validate(emailSettingsValidation), createEmailSettings);
emailRouter.put("/settings/", validate(emailSettingsValidation), sendFromGmail);
emailRouter.delete("/settings/", validate(mailerValidation), sendFromGmail);

export default emailRouter;
