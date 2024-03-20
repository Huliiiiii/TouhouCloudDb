const express = require("express");
const router = express.Router();
const { pool } = require("../../functions/query.js");

router.get("/song:id", async function (req, res) {
	try {
		const id = req.params.id;
		const [song_result] = await pool.query("SELECT * FROM touhoudbtest.song WHERE id = ? AND is_deleted = 0", [id]);
		const [release_result] = await pool.query("SELECT * FROM touhoudbtest.release WHERE JSON_CONTAINS(track_listing, CAST(? AS JSON), '$');", [
			JSON.stringify(id),
		]);

		let artist_result = null;
		if (song_result[0].artist) {
			const songArtist = song_result[0].artist;
			const ids = Object.keys(song_result[0].credits).concat(songArtist);
			const artistInfo = "SELECT * FROM touhoudbtest.artist WHERE id IN (?) AND is_deleted = 0";
			[artist_result] = await pool.query(artistInfo, [ids]);
		}

		res.render("./item_page/song_page", { songResult: song_result[0], albumResult: release_result, artistResult: artist_result });
	} catch (error) {
		console.error(error);
		res.status(404).send("An error occurred while processing the request");
	}
});

module.exports = router;
