"use strict";
import { Router } from "express";
import { getUserInfo, setUserInfo } from "./userController.js";
import { getUserBoard, createUserBoard } from "./userController.js";

export const userRouter = Router();

userRouter.get("/board", getUserBoard);
userRouter.post("/board", createUserBoard);

userRouter.get("/info", getUserInfo);
userRouter.post("/info", setUserInfo);
