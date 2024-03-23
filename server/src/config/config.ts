import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

interface config extends Record<string, unknown> {
	database: {
		host: string;
		username: string;
		password: string;
		database_name: string;
	};
	server: {
		host: string;
		port: number;
	};
	log_dir: string;
}

const cfg: Record<string, config> = {
	development: {
		database: {
			host: "localhost",
			username: "root",
			password: process.env.DATABASE_PASSWORD!,
			database_name: "touhoudbtest",
		},
		server: {
			host: "localhost",
			port: 3007,
		},
		log_dir: path.join(__dirname, "logs"),
	},
	test: {
		database: {
			host: "TODO",
			username: "TODO",
			password: "TODO",
			database_name: "TODO",
		},
		server: {
			host: "TODO",
			port: NaN,
		},
		log_dir: "TODO",
	},
	production: {
		database: {
			host: "TODO",
			username: "TODO",
			password: "TODO",
			database_name: "TODO",
		},
		server: {
			host: "TODO",
			port: NaN,
		},
		log_dir: "TODO",
	},
};

export const config = cfg[process?.env?.NODE_ENV ?? "development"]!;
