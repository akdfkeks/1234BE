import prisma from "../orm/prisma";

export async function getTodo(userId, targetYearMonth) {
	// targetYearMonth example : 202206
	try {
		const recentTodoLists = await prisma.scheduleCart.findUnique({
			where: {
				ownerId_yearMonth: { ownerId: userId, yearMonth: targetYearMonth },
			},
			include: {
				schedules: true,
			},
		});

		return recentTodoLists;
	} catch (error) {
		console.log(error);
		throw new Error("Fail to get data");
	}
}

export async function createTodo(userId, title, targetDate) {}
