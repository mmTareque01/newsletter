import express from "express";
import {
  createSubscriber,
  deleteSubscriber,
  getAllSubscribers,
  updateSubscriber,
} from "./controllers";
import { validate } from "../../middleware/validation";
import { createSubscriberSchema } from "../../validation/subscriber.validation";
import { apiKeyAuth } from "../../middleware/apiKeyAuth";
import { upload } from "../../middleware/fileUploader";
import { createBulkSubscriber } from "./controllers/bulkCreate.subscriber.controller";

const subscriber = express.Router(); //making router handlers
export const publicSubscribe = express.Router();

subscriber.get("/", getAllSubscribers);
// subscriber.get("/:id", getAllSubscribers);
subscriber.post("/", validate(createSubscriberSchema), createSubscriber);
subscriber.post("/bulk", upload.single('subscribers'), createBulkSubscriber);
subscriber.put("/:id", updateSubscriber);
// subscriber.get("/", validate(createSubscriberSchema), createSubscriber);
subscriber.delete("/:id", deleteSubscriber);

publicSubscribe.post(
  "/newsletter/subscribe",
  [apiKeyAuth, validate(createSubscriberSchema)],
  createSubscriber
);
// subscriber.put("/:id", validate(createSubscriberSchema), createSubscriber);
// subscriber.delete("/:id", validate(createSubscriberSchema), createSubscriber);

export default subscriber;
