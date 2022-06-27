import passport from "passport";

export function jwtAuth(req, res, next) {
	if (!req.cookies.token) {
		res.json({ success: false, message: "No permission!" });
		return;
	}
	return passport.authenticate("jwt", { session: false }, (err, jwtPayload) => {
		if (err || !jwtPayload) {
			return res.status(400).json({ success: false, message: "Fail to validate JWT" });
		}
		//console.log(jwtPayload);
		// set JWT's payload(data) to req.body
		// for Next Middleware can access to the object
		req.body.user = jwtPayload;
		next();
	})(req, res, next);
}
