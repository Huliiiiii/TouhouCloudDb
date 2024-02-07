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
	connectionLimit: 10,
	queueLimit: 0
});

router.get("/album:id", async function (req, res) {
	try {
		const albumId = req.params.id;
		const [albumResult] = await pool.query("SELECT * FROM touhoudbtest.albums WHERE albumID = ? AND isDelete = 0", [albumId]);

		let artistResult = null;
		if (albumResult[0].artist) {
			const albumArtist = albumResult[0].artist;
			[artistResult] = await pool.query("SELECT * FROM touhoudbtest.artists WHERE artistID IN (?) AND isDelete = 0", [albumArtist]);
		}

		res.render("album_page", {albumResult: albumResult[0], artistResult});
	} catch (error) {
		console.error(error);
		res.status(404).send("Album not found");
	}
});

module.exports = router;
