const express = require("express");
const router = express.Router();
const { pool } = require("../../functions/query.js");

router.get("/song:id", async function (req, res) {
	try {
		const song_id = req.params.id;
		const [song_result] = await pool.query("SELECT * FROM touhoudbtest.songs WHERE songID = ? AND is_deleted = 0", [song_id]);
		const [release_result] = await pool.query("SELECT * FROM touhoudbtest.release WHERE JSON_CONTAINS(track_listing, CAST(? AS JSON), '$');", [
			JSON.stringify(song_id),
		]);

		let artist_result = null;
		if (song_result[0].artist) {
			const songArtist = song_result[0].artist;
			const artist_ids = Object.keys(song_result[0].credits).concat(songArtist);
			const artistInfo = "SELECT * FROM touhoudbtest.artists WHERE artist_id IN (?) AND is_deleted = 0";
			[artist_result] = await pool.query(artistInfo, [artist_ids]);
		}

		res.render("./item_page/song_page", { songResult: song_result[0], albumResult: release_result, artistResult: artist_result });
	} catch (error) {
		console.error(error);
		res.status(404).send("An error occurred while processing the request");
	}
});

module.exports = router;
