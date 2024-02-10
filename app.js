const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3007;

app.use(cors());
// eslint-disable-next-line no-unused-vars
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./css"));
app.use("/src", express.static("./src"));
//

app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
	res.cc = function (err, status = 1) {
		res.send({
			status,
			message: err instanceof Error ? err.message : err
		});
	};
	next();
});

app.use(require("./index.js"));

// fs.readdir(RoutesPath, async (err, files) => {
// 	if (!err) {
// 		for (let i = 0; i < files.length; i++) {
// 			app.use("/", require(`${RoutesPath}/${files[i]}`));
// 		}
// 	} else {
// 		console.log();
// 	}
// });
const RoutesPath = "./routes";
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

loadRoutes(app, RoutesPath);

app.listen(port, () => console.log(`server runing at http://127.0.0.1:${port}/`));
