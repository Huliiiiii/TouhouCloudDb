const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({extended: false}));

// const mysql = require("mysql2");
// const pool = mysql.createPool({
// 	host: "localhost",
// 	user: "root",
// 	password: "KitsuneMySQLPw2333==",
// 	database: "touhoudbtest"
// });

router.get("/add/song", function (req, res) {
	res.render(".add/add_song");
});

module.exports = router;
