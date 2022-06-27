export function userInfoCheck(reqUser) {
	let flag = false;
	if (!reqUser.userId || !reqUser.userPw) {
		flag = true;
	} else {
		flag = false;
	}
	return flag;
}
export function loginInfoCheck(user) {
	if (!user) return "";

	return;
}
