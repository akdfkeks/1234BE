"use strict";

import prisma from "../../orm/prisma.js";

import { createHashedPw } from "../password.js";
import { getYearMonth } from "../etc/getYearMonth.js";

export async function SignUp(reqUser) {
	// Check if user already exists
	const userExists = await prisma.user.count({ where: { userId: reqUser.userId } });
	if (userExists) throw new Error("User already exists");

	const { hashedPw, salt } = await createHashedPw(reqUser.userPw);
	const userData = await prisma.user.create({
		data: {
			name: reqUser.name || reqUser.userId,
			userId: reqUser.userId,
			salt: salt,
			userPw: hashedPw,
		},
	});

	if (userData) {
		const currentYearMonth = parseInt(getYearMonth());
		const scheduleCart = await prisma.scheduleCart.create({
			data: {
				yearMonth: currentYearMonth,
				ownerId: userData.userId,
			},
		});
		if (!scheduleCart) {
			throw new Error("Fail to create ScheduleCart");
		}
		return userData;
	} else throw new Error("Fail to create User");
}

export async function Login(user) {
	const userData = await prisma.user.findUnique({
		where: { userId: user.userId },
	});
	return userData;
}
