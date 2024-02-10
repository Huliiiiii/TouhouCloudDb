const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({extended: false}));

const mysql = require("mysql2/promise");
const pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "root",
	password: "KitsuneMySQLPw2333==",
	database: "touhoudbtest"
});

router.get("/song:id", async function (req, res) {
	try {
		const songId = req.params.id;
		const [songResult] = await pool.query("SELECT * FROM touhoudbtest.songs WHERE songID = ? AND isDelete = 0", [songId]);
		const [albumResult] = await pool.query("SELECT * FROM touhoudbtest.albums WHERE JSON_CONTAINS(Tracklist, CAST(? AS JSON), '$');", [JSON.stringify(songId)]);

		let artistResult = null;
		if (songResult[0].artist) {
			const songArtist = songResult[0].artist;
			const artistIDs = Object.keys(songResult[0].credits).concat(songArtist);
			const artistInfo = "SELECT * FROM touhoudbtest.artists WHERE artistID IN (?) AND isDelete = 0";
			[artistResult] = await pool.query(artistInfo, [artistIDs]);
		}

		res.render("./item_page/song_page", {songResult: songResult[0], albumResult, artistResult});
	} catch (error) {
		console.error(error);
		res.status(404).send("An error occurred while processing the request");
	}
});

module.exports = router;
