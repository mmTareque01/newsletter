import subscriber, { publicSubscribe } from "./subscriber";
import express from "express";

const service = express.Router();

service.use("/subscriber", subscriber);
service.use("/newsletter/subscribe", publicSubscribe)

export default service;
