import { apiKeyAuth } from "../middleware/apiKeyAuth";
import { authenticate } from "../middleware/authentication";
import auth from "./auth";
import newsletterRouter from "./newsletter";
import typeRouter from "./newsletterType";
import userRouter from "./user";
import mailRouter from "./mailer";
import subscriber, { publicSubscribe } from "./subscriber";
import express from "express";

const service = express.Router();

service.use("/auth", auth);
service.use("/subscriber", authenticate, subscriber);
service.use("/newsletter/subscribe", apiKeyAuth, publicSubscribe);
service.use("/newsletter", authenticate, newsletterRouter);
service.use("/newsletter/type", authenticate, typeRouter);
service.use("/user", authenticate, userRouter);
service.use("/mail", authenticate, mailRouter);
export default service;
