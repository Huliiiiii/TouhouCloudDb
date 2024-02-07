const express = require("express");
const app = express();
const port = 3007;

const cors = require("cors");
app.use(cors());

const ejs = require("ejs");
app.set("view engine", "ejs");

app.use(express.static("./css"));

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
const fs = require("fs");
const RouterPath = "./routes";

fs.readdir(RouterPath, async (err, files) => {
	if (!err) {
		for (let i = 0; i < files.length; i++) {
			app.use("/", require(`${RouterPath}/${files[i]}`));
		}
	} else {
		console.log();
	}
});

app.listen(port, () =>
	console.log(
		`api server runing at http://127.0.0.1:${port}/\nhttp://127.0.0.1:${port}/东方同人音乐流派数据库/song\nhttp://127.0.0.1:${port}/touhoudbtest/songs`
	)
);

// // const SongsRouter = require("./router/songs");
// // app.use("", SongsRouter);
