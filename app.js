const express = require("express");
const app = express();

//
const fs = require("fs");
const path = require("path");
//
const port = 3007;

//
const cors = require("cors");
app.use(cors());
// eslint-disable-next-line no-unused-vars
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./css"));
app.use("/src", express.static("./src"));
//

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.cc = function (err, status = 1) {
		res.send({
			status,
			message: err instanceof Error ? err.message : err,
		});
	};
	next();
});

// 限流
const { rateLimit } = require("express-rate-limit");
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
});

app.use(limiter);

app.use(require("./index.js"));

const routes_path = "./routes";
const loadRoutes = (app, dir) => {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			loadRoutes(app, filePath);
		} else {
			app.use("/", require(path.resolve(filePath)));
		}
	});
};

loadRoutes(app, routes_path);

app.listen(port, () => console.log(`Server runing at http://127.0.0.1:${port}/`));
