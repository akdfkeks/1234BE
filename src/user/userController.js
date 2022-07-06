"use strict";

import prisma from "../orm/prisma.js";
import { logger } from "../function/logger/logger.js";

export async function getUserBoard(req, res, next) {
	const { userId } = req.body.user;
	try {
		// TODO : Modularization
		const userInfo = await prisma.user.findUnique({
			where: { userId: userId },
			include: {
				boardList: {
					select: {
						uuid: true,
						title: true,
						ownerId: true,
					},
				},
			},
		});
		res.status(200).json({ success: true, message: "Succeed", data: userInfo.boardList });
	} catch (err) {
		logger.error(err);
	}
}
export async function createUserBoard(req, res, next) {
	const { userId } = req.body.user;
	const { boardTitle } = req.body;
	try {
		// TODO : Modularization
		const userInfo = await prisma.user.update({
			where: { userId },
			data: {
				boardList: {
					create: {
						title: boardTitle,
					},
				},
			},
			include: {
				boardList: {
					select: {
						uuid: true,
						title: true,
						ownerId: true,
					},
				},
			},
		});
		res.status(200).json({ success: true, message: "Succeed", data: userInfo.boardList });
	} catch (err) {
		logger.error(err);
	}
}
export async function getUserInfo(req, res, next) {
	const { userId } = req.body;
	try {
		const userInfo = await prisma.user.findUnique({
			where: { userId: userId },
		});
		res.status(200).json({ success: true, message: "User Info", data: userInfo });
	} catch (err) {
		console.error(err);
	}
}
export function setUserInfo(req, res, next) {
	const { userId } = req.body;
}
