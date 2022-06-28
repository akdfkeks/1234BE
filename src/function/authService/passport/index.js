import prisma from "../../../orm/prisma.js";
import passport from "passport";
import Joi from "joi";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import { makePwHashed } from "../../password.js";

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

const loginSchema = Joi.object().keys({
	userId: Joi.string().min(1).max(20).required(),
	userPw: Joi.string().min(1).max(40).required(),
});
const LocalConfig = {
	usernameField: "userId",
	passwordField: "userPw",
};

async function LocalVerify(userId, userPw, done) {
	const { error } = loginSchema.validate({ userId, userPw }, { abortEarly: true });
	if (error) return done(null, false, { message: "Invalid data format" });
	try {
		const user = await prisma.user.findUnique({
			where: { userId: userId },
		});
		if (!user) {
			return done(null, false, { message: "No such user" });
		}

		const hashedPw = await makePwHashed(userPw, user.salt);
		if (hashedPw !== user.userPw) {
			return done(null, false, { message: "Password Incorrect" });
		}
		return done(null, user);
	} catch (err) {
		return done("Error");
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
async function JWTVerify(jwtPayload, done) {
	done(null, jwtPayload);
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
