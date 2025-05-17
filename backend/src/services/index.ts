import { authenticate } from "../middleware/authentication";
import auth from "./auth";
import subscriber, { publicSubscribe } from "./subscriber";
import express from "express";

const service = express.Router();

service.use("/auth", auth);
service.use("/subscriber", authenticate, subscriber);
service.use("/newsletter/subscribe", publicSubscribe);

export default service;
