import express from "express";
import {  login, logout, register, token } from "./controllers";
import { validate } from "../../middleware/validation";
import { loginSchema, registerSchema } from "../../validation/user.validation";

const auth = express.Router(); //making router handlers

auth.get("/token", token);
auth.post("/register", validate(registerSchema) ,register);
auth.post("/login", validate(loginSchema),login);
auth.post("/logout",  logout);

export default auth;
