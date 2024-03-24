import log4js from "log4js";
import pathLib from "path";
import { config } from "config/config.js";

const logConfig = {
	appenders: {
		debug: {
			type: "console",
		},
		info: {
			type: "dateFile",
			filename: pathLib.join(config.log_dir, "info.log"),
			pattern: "-yyyy-MM-dd.log",
		},
		//错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
		errorLog: {
			type: "dateFile",
			filename: pathLib.join(config.log_dir, "error.log"),
			pattern: "-yyyy-MM-dd.log",
		},
		error: { type: "logLevelFilter", level: "error", appender: "errorLog" },
	},
	categories: {
		default: { appenders: ["debug", "info", "error"], level: "debug" },
		info: { appenders: ["info", "error"], level: "info" },
	},
};

const logger = log4js.configure(logConfig).getLogger();

export default logger;
