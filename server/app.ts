import cookieParser from "cookie-parser";
import express from "express";
import fs from "fs";
// import createError from "http-errors";
import { config } from "config/config.js";
import * as dotenv from "dotenv";
import path from "path";
import logger from "utils/logger.js";
import webRouter from "./src/router/web_router";
dotenv.config({ path: [".env.local", ".env"] });
const app = express();

import syncDatabase from "database/sync";

// 跨域请求
import cors from "cors";

app.use(cors());

// 日志
import morgan from "morgan";

app.use(morgan("dev"));

// 模板引擎
// eslint-disable-next-line no-unused-vars
app.set("view engine", "ejs");
app.set("views", "./views");
//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态资源
app.use(express.static("./css"));
app.use("/src", express.static("./src"));
//

app.use(express.urlencoded({ extended: false }));

// 限流
// const { rateLimit } = require("express-rate-limit");
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	// store: ... , // Use an external store for consistency across multiple server instances.
// });
// app.use(limiter);

// 路由
const routes_path = "./src/routes";
const loadRoutes = (dir: string) => {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			loadRoutes(filePath);
		} else {
			const _path = path.resolve(filePath);
			app.use("/", require(_path));
		}
	});
};
loadRoutes(routes_path);
app.use("/", webRouter);

// app.use(function (req, res, next) {
// 	next(createError(404));
// });
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

// error handler
// Ctrl + C的代码还没搞明白怎么用
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });
