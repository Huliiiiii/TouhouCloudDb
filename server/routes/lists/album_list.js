const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: false }));

// const get_album_page_data = require("../../functions/get_album_page_data");
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "KitsuneMySQLPw2333==",
	database: "touhoudbtest",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

router.get("/list/albums", async function (req, res) {
	try {
		const [album_result, _] = await pool.query(
			"SELECT * FROM touhoudbtest.albums"
		);
		res.send(album_result);
	} catch (error) {
		console.error(error);
		res.status(404).send("Album not found");
	}
});

module.exports = router;
