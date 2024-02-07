const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({extended: false}));

const mysql = require("mysql2");
const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "KitsuneMySQLPw2333==",
	database: "touhoudbtest"
});

var viewAlbums = "SELECT * FROM touhoudbtest.albums";
var formattedDate = 'SELECT DATE_FORMAT(ReleasedDate, "%Y-%m-%d") AS ReleseDate FROM touhoudbtest.albums';
var viewSongs = "SELECT * FROM touhoudbtest.songs";

db.query(viewAlbums, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		albumData = result;
	}
});
db.query(viewSongs, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		songData = result;
	}
});
db.query(formattedDate, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		formattedDateData = result;
	}
});
router.get("/list/albums", function (req, res, next) {
	res.render("list_albums", {
		albumData,
		formattedDateData,
		songData
	});
});

module.exports = router;
