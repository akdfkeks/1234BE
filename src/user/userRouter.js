"use strict";
import { Router } from "express";
import { getUserInfo, setUserInfo } from "./userController.js";

export const userRouter = Router();

userRouter.get("/info", getUserInfo);
userRouter.post("/info", setUserInfo);
