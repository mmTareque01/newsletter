import express from "express";
import { getUsersInfo, updateUsersInfo } from "./controllers";

var router = express.Router(); //making router handlers

router.get("/", getUsersInfo);
router.put("/", updateUsersInfo);

export default router;
