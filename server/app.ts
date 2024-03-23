import cookieParser from "cookie-parser";
import express from "express";
import syncDatabase from "component/database/sync";
import logger from "component/logger/logger";
import webRouter from "component/router/web_router";
import { config } from "config/config.js";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";

const app = express();

// 环境变量
dotenv.config({ path: [".env.local", ".env"] });

// 跨域请求
app.use(cors());

// 日志
app.use(morgan("dev"));

// 解析中间件
app.use(express.json());
// extend 为 false 时，值只能为字符串或者数组。当设置为 true，则可以是任意类型
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 限流
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "component/error_handle/error_handler";
const limeter_time = process.env.NODE_ENV !== "production" ? 0 : 1000 * 60 * 5;
const limiter = rateLimit({
	windowMs: limeter_time, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
});
app.use(limiter);

// 路由
app.use("/", webRouter);

// 404 Not Found
app.use(function notFoundHandler(_req, res, _next) {
	res.status(404).send();
});

// 错误处理
app.use(errorHandler);

// 启动
const host = config.server.host;
const port = config.server.port;
// Something only appears in dev or test
if (process.env.NODE_ENV !== "production") {
	// Sync database models
	// Sync database before run
	void syncDatabase().then(() => {
		app.listen(port, () => {
			logger.info(`Server running at http://${host}:${port}`);
		});
	});
} else {
	app.listen(port, () => {
		logger.info(`Server running at http://${host}:${port}`);
	});
}
