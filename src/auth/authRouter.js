"use strict";
import { Router } from "express";
import { signUp, login, logout } from "./authController.js";

export const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
// auth/login
// auth/signup
