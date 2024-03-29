// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: [".env.local", ".env"] });

const config = {
	dbOptions: {
		database: "touhoudbtest",
		username: "root",
		password: process.env.DATABASE_PASSWORD,
		dialect: "mysql",
		host: "localhost",
		port: 3306,
		logging: false,
	},
	options: {
		type: "ts",
		dir: "src/database/models/automatic",
	},
};

module.exports = config;
