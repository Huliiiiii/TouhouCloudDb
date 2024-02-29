import config from "./config/config.json";
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();

//DataBase Models
import sequelize from "./database/query";
//TODO: Not use this in production environment
require("./database/sync"); // Sync database before run

//
import fs from "fs";
import path from "path";

// 跨域请求
import cors from "cors";
app.use(cors());

// 日志
import morgan from "morgan";
app.use(morgan("dev"));

// 模板引擎
// eslint-disable-next-line no-unused-vars
import ejs from "ejs";
app.set("view engine", ejs);
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

// index page
app.use(require("./index.js"));

// 路由
const routes_path = "./routes";
const loadRoutes = (dir: string) => {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			loadRoutes(filePath);
		} else {
			app.use("/", require(path.resolve(filePath)));
		}
	});
};
loadRoutes(routes_path);

app.use(function (req, res, next) {
	next(createError(404));
});

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
app.listen(config.server.port, () => console.log(`Server runing at http://127.0.0.1:${config.server.port}/`));
