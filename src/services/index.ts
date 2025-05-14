import subscriber from "./subscriber";
import express from "express";

const service = express.Router();

service.use("/subscriber", subscriber);

export default service;
