import { authenticate } from "../middleware/authentication";
import auth from "./auth";
import newsletterRouter from "./newsletter";
import subscriber, { publicSubscribe } from "./subscriber";
import express from "express";

const service = express.Router();

service.use("/auth", auth);
service.use("/subscriber", authenticate, subscriber);
service.use("/newsletter/subscribe", publicSubscribe);
service.use("/newsletter", newsletterRouter);

export default service;
