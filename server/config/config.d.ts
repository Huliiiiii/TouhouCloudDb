namespace config {
	export interface database {
		host: string;
		username: string;
		password: string;
		database_name: string;
	}
	export interface server {
		port: number;
	}
	let database: database;
	let server: server;
	let log_dir:string;
}

export default config;
