const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({extended: false}));

const mysql = require("mysql2/promise");
const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "KitsuneMySQLPw2333==",
	database: "touhoudbtest",
	waitForConnections: true,
	connectionLimit: 10
});

router.get("/list/songs", async function (req, res) {
	try {
		const connection = await pool.getConnection();
		let getAllSongs = "SELECT * FROM touhoudbtest.songs WHERE is_deleted = 0";
		const [songList] = await connection.query(getAllSongs);
		connection.release();
		res.render("list_songs", {songList});
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while processing the request");
	}
});

module.exports = router;
