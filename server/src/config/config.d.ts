// config.d.ts

interface DatabaseConfig {
	host: string;
	username: string;
	password: string;
	database_name: string;
}

interface ServerConfig {
	port: number;
}

interface Config {
	database: DatabaseConfig;
	server: ServerConfig;
	log_dir: string;
}

declare const config: Config;

export default config;
