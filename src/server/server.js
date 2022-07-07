"use strict";

import cors from "cors";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import passportConfig from "../function/authService/passport/index.js";

import { jwtAuth } from "../function/authService/jwtAuth.js";
import { userRouter } from "../user/userRouter.js";
import { authRouter } from "../auth/authRouter.js";
import { todoRouter } from "../todo/todoRouter.js";

export async function createServer() {
	const app = express();

	// set basic Middleware
	app.use(cors());
	app.use(morgan("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(passport.initialize());
	passportConfig();

	// Routers
	app.use("/todo", jwtAuth, todoRouter);
	app.use("/user", jwtAuth, userRouter);
	app.use("/auth", authRouter);

	// Root routes
	app.use("/", (req, res) => {
		res.status(200).json({ success: true, message: "Hi" });
	});
	app.use((req, res) => {
		res.status(404).json({ success: false, message: "Page Not Found" });
	});

	return app;
}
