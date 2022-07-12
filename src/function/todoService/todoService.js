import prisma from "../../orm/prisma.js";
import { parseYearMonthFromInput, getYearToMin, parseISODateFromInput } from "../etc/date.js";
import { logger } from "../logger/logger.js";

export async function getTodo(userId, targetYearMonth) {
	if (!userId || !targetYearMonth) throw new Error("todoService : Invalid arguments");

	try {
		const recentTodoLists = await prisma.scheduleCart.upsert({
			where: {
				ownerId_yearMonth: { ownerId: userId, yearMonth: targetYearMonth },
			},
			include: {
				schedules: {
					select: {
						uuid: true,
						title: true,
						targetDate: true,
						onChecked: true,
					},
				},
			},
			create: {
				ownerId: userId,
				yearMonth: targetYearMonth,
			},
			update: {
				ownerId: userId,
				yearMonth: targetYearMonth,
			},
		});
		return recentTodoLists;
	} catch (error) {
		logger.error(err);
		throw new Error("todoService : Fail to get TODO cart");
	}
}

export async function createTodo(userId, title, targetDate) {
	//if (!userId) throw new Error("todoService : Need to Login");
	if (!title) title = "";
	if (!targetDate) targetDate = getYearToMin();

	const yearMonth = parseYearMonthFromInput(targetDate); // ex) 20220628
	const targetISODate = parseISODateFromInput(targetDate, "YYYYMMDD-HHmm");
	// ex) 2022-08-01T17:00:00.000Z

	try {
		const newTodoList = await prisma.scheduleCart.upsert({
			where: {
				ownerId_yearMonth: { ownerId: userId, yearMonth: yearMonth },
			},
			include: {
				schedules: {
					select: {
						uuid: true,
						title: true,
						targetDate: true,
						onChecked: true,
					},
				},
			},
			create: {
				ownerId: userId,
				yearMonth: yearMonth,
			},
			update: {
				schedules: { create: { title, targetDate: targetISODate } },
			},
		});
		return newTodoList;
	} catch (error) {
		logger.error(err);
		throw new Error("todoService : Fail to create a new schedule");
	}
}

export async function deleteTodo(uuid) {
	try {
		const data = await prisma.schedule.delete({
			where: {
				uuid: uuid,
			},
		});
		return data;
	} catch (error) {
		throw new Error("No such schedule");
	}
}
