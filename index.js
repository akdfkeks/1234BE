"use strict";

import dotenv from "dotenv";
import { createServer } from "./src/server/server.js";

dotenv.config();

async function start() {
	try {
		const server = await createServer();
		const PORT = process.env.PORT || 3001;
		server.listen(PORT, "0.0.0.0", () => console.log(`Server running on port http://localhost:${PORT}`));
	} catch (err) {
		console.log(err);
	}
}

start();
