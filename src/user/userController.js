"use strict";

import prisma from "../orm/prisma.js";
import { logger } from "../function/logger/logger.js";

export async function getUserBoard(req, res, next) {
	const { userId } = req.body.user;
	try {
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
export function createUserBoard(req, res, next) {
	const { userId } = req.body;
}
export function getUserInfo(req, res, next) {
	const { userId } = req.body;
}
export function setUserInfo(req, res, next) {
	const { userId } = req.body;
}
