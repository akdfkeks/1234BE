"use strict";

import cors from "cors";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import passportConfig from "../function/passport/index.js";

import { jwtAuth } from "../function/authService/jwtAuth.js";
import { userRouter } from "../user/userRouter.js";
import { authRouter } from "../auth/authRouter.js";
import { todoRouter } from "../todo/todoRouter.js";
import { exceptCtrl, rootCtrl } from "./except.js";

export async function createServer() {
	const app = express();

	// set basic Middleware
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(passport.initialize());
	passportConfig();

	// Routers
	app.use("/todo", jwtAuth, todoRouter);
	app.use("/user", jwtAuth, userRouter);
	app.use("/auth", authRouter);

	app.use("/", rootCtrl);
	app.use(exceptCtrl);

	return app;
}
