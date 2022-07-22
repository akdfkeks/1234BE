import crypto from "crypto";

function createSalt() {
	const buf = crypto.randomBytes(64);
	const salt = buf.toString("base64");

	return salt;
}
// new Promise((resolve, reject) => {
// 	crypto.randomBytes(64, (err, buf) => {
// 		if (err) reject(err);
// 		resolve(buf.toString("base64"));
// 	});
// });

export const createHashedPw = (plainPassword) =>
	new Promise(async (resolve, reject) => {
		const salt = createSalt();
		crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
			if (err) reject(err);
			resolve({ hashedPw: key.toString("base64"), salt });
		});
	});

export const makePwHashed = (plainPassword, salt) =>
	new Promise(async (resolve, reject) => {
		crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
			if (err) reject(err);
			resolve(key.toString("base64"));
		});
	});
