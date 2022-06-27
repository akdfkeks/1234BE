"use strict";

import { getTodo, createTodo } from "../function/todoService/todoService";
import { getYearMonth } from "../function/etc/getYearMonth";

export async function getToodoo(req, res, next) {
	// user object from jwtAuth Middleware
	const { userId } = req.body.user;
	const { targetYearMonth } = req.body;

	try {
		const data = await getTodo(userId, targetYearMonth);
		res.status(200).json({ success: true, message: "Success!", data: data });
	} catch (err) {
		console.log(err);
		res.status(400).json({ success: false, message: err.message });
	}
}

export async function createToodoo(req, res, next) {
	const { userId } = req.body.user;
	const { title, targetDate } = req.body;

	try {
		const data = await createTodo(userId, title, targetDate);
		res.status(200).json({ success: true, message: "Success!", data: data });
	} catch (err) {
		console.log(err);
		res.status(400).json({ success: false, message: err.message });
	}
}

export function modifyTodo(req, res, next) {
	//
}
