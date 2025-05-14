import express from "express";
import { createSubscriber, getAllSubscribers } from "./controllers";
import { validate } from "../../middleware/validation";
import { createSubscriberSchema } from "../../validation/subscriber.validation";

const subscriber = express.Router(); //making router handlers
export const publicSubscribe = express.Router();

subscriber.get("/", getAllSubscribers);
// subscriber.get("/:id", getAllSubscribers);
subscriber.post("/", validate(createSubscriberSchema), createSubscriber);
publicSubscribe.post("/", validate(createSubscriberSchema), createSubscriber);
// subscriber.put("/:id", validate(createSubscriberSchema), createSubscriber);
// subscriber.delete("/:id", validate(createSubscriberSchema), createSubscriber);

export default subscriber;
