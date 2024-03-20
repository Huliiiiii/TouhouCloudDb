declare module "process" {
	global {
		namespace NodeJS {
			interface ProcessEnv {
				DATABASE_PASSWORD: string;
				SERVER_URL: string;
				SERVER_PORT: string;
			}
		}
	}
}
