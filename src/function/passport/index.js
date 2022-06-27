import prisma from "../../orm/prisma.js";
import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import { makePwHashed } from "../password.js";

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

const LocalConfig = {
	usernameField: "userId",
	passwordField: "userPw",
};
async function LocalVerify(userId, userPw, fin) {
	if (!userId || !userPw) return fin("Invalid data format");
	try {
		const user = await prisma.user.findUnique({
			where: { userId: userId },
		});
		if (!user) {
			return fin(null, false, { message: "User not found" });
		}
		// TODO : implement createHasedPw()
		const hashedPw = await makePwHashed(userPw, user.salt);
		if (hashedPw !== user.userPw) {
			return fin(null, false, { message: "Password Incorrect" });
		}
		return fin(null, user);
	} catch (err) {
		return fin("Error");
	}
}
const cookieExtractor = (req) => {
	return req.cookies.token;
};
const JWTConfig = {
	//jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	jwtFromRequest: cookieExtractor,
	secretOrKey: process.env.JWT_SECRET,
};
async function JWTVerify(jwtPayload, fin) {
	fin(null, jwtPayload);
	// try {
	// 	const user = await prisma.user.findUnique({ where: { userId: jwtPayload.userId } });
	// 	if (!user) {
	// 		return fin(null, false, { message: "Inaccurate Token" });
	// 	}
	// 	const resUser = {
	// 		name: user.name,
	// 		userId: user.userId,
	// 	};
	// 	return fin(null, jwtPayload);
	// } catch (err) {
	// 	return fin(null, { Error: err });
	// }
}

export default function passportConfig() {
	passport.use("local", new LocalStrategy(LocalConfig, LocalVerify));
	passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
}
