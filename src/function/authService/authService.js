"use strict";

import prisma from "../../orm/prisma.js";

import { createHashedPw } from "../etc/password.js";
import { getYearMonth } from "../etc/date.js";

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
		return userData;
	} else throw new Error("Fail to create User");
}

export async function Login(user) {
	const userData = await prisma.user.findUnique({
		where: { userId: user.userId },
	});
	return userData;
}
