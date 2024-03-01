const path = require("path");
require("dotenv").config({ path: [".env.local", ".env"] });

const cfg = {
	development: {
		database: {
			host: "localhost",
			username: "root",
			password: process.env.DATABASE_PASSWORD,
			database_name: "touhoudbtest",
		},
		server: {
			port: 3007,
		},
		log_dir: path.join(__dirname, "..", "logs"),
	},
	test: {},
	production: {},
};
const config = cfg[process.env.NODE_ENV || "development"];
module.exports = config;
