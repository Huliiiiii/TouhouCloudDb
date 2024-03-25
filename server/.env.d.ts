declare module "process" {
	global {
		namespace NodeJS {
			interface ProcessEnv {
				DATABASE_PASSWORD: string;
			}
		}
	}
}
