"use strict";

import { userInfoCheck } from "../function/etc/formatChecker.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import { SignUp } from "../function/authService/authService.js";
import { logger } from "../function/logger/logger.js";

dotenv.config();

export async function signUp(req, res, next) {
	const reqUser = {
		name: req.body.name,
		userId: req.body.userId,
		userPw: req.body.userPw,
	};

	let error = userInfoCheck(reqUser);
	if (!error) {
		try {
			const user = await SignUp(reqUser);
			res.status(200).json({ success: true, message: "SignUp Succeed" });
		} catch (err) {
			logger.error(err);
			res.status(500).json({ success: false, message: err.message });
		}
	} else {
		res.status(422).json({ success: false, message: "Invalid Data Format" });
	}
}

export async function login(req, res, next) {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({ success: false, message: "No such User" });
		}
		req.login(user, { session: false }, (error) => {
			if (error) {
				return res.status(400).json({
					success: false,
					message: "Login Failed",
					user: user,
				});
			}
			const resUser = {
				userName: user.name,
				userId: user.userId,
			};
			const token = jwt.sign(resUser, process.env.JWT_SECRET, {
				expiresIn: "2h",
				issuer: "TOODOO",
			});
			return (
				res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 120 }),
				res.status(200).json({ success: true, message: "Login Succeed" })
			);
		});
	})(req, res);
}
export function logout(req, res, next) {
	return res.cookie("token", null, { maxAge: 0 }), res.status(200).json({ success: true, message: "Logout Succeed" });
}
