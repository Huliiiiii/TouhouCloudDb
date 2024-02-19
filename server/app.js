var createError = require("http-errors");
var express = require("express");
var fs = require("fs");
var path = require("path");

var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

var cors = require("cors");
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// routes
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
