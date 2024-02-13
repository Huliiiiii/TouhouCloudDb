const router = require("express").Router();
const { pool } = require("../../functions/query.js");

const getReleaseDataByID = async (release_id) => {
	const [[release_data]] = await pool.query(`SELECT * FROM touhoudbtest.release WHERE release_id = ${release_id} AND is_deleted = 0`);

	return release_data;
};

const getArtistNamesByID = async (artist_id_arr) => {
	const [artist_result] = await pool.query("SELECT * FROM touhoudbtest.artists WHERE artist_id IN (?) AND is_deleted = 0", [artist_id_arr]);
	const getArtistName = (artist_id) => {
		const matching_artist = artist_result.find((artist) => artist.artist_id == artist_id);
		return matching_artist ? matching_artist.name : "n/a";
	};
	return artist_id_arr ? artist_id_arr.map(getArtistName).join(" / ") : null;
};

const generateTrackListingBlock = async (track_listing) => {
	if (!track_listing) {
		return "<p>n/a</p>";
	}
	const track_nums = track_listing.map((subArr) => subArr[0]);
	const track_id_arr = track_listing.map((subArr) => subArr[1]);
	const [song_result] = await pool.query(`SELECT * FROM touhoudbtest.songs WHERE songID IN (${track_id_arr})`);
	const track_listing_tracks =
		song_result ?
			song_result
				.map((song, i) => {
					if (song.is_deleted == 0) {
						return `<tr><td>${track_nums[i]}</td><td><a href="/song${song.songID}">${song.title}</a></td></tr>`;
					} else {
						return `<tr><td>${track_nums[i]}</td><td>[deleted song]</td></tr>`;
					}
				})
				.join("")
		:	"<tr>n/a</tr>";
	let result = "<table><tr><td></td><td>Title</td></tr>" + track_listing_tracks + "</table>";
	return result;
};

router.get("/release:id", async function (req, res) {
	try {
		const release_id = req.params.id;
		if (isNaN(parseFloat(release_id))) {
			res.status(404).send("Release id must be a number");
			throw new Error("Release id must be a number");
		}
		const release_data = await getReleaseDataByID(release_id);
		if (!release_data) {
			res.status(404).send("Release not found");
			throw new Error("Release not found");
		}
		const release_title = release_data.title;
		const release_artist_name = await getArtistNamesByID(release_data.release_artist);
		const track_listing_block = await generateTrackListingBlock(release_data.track_listing);
		res.render("./item_page/release_page", {
			release_title,
			release_artist_name,
			track_listing_block,
		});
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
