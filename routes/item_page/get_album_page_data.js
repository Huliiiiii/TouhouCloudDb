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

async function get_album_page_data(album_id) {
	var album_id_str = `${album_id}`;
	const [album_result] = await pool.query(`SELECT * FROM touhoudbtest.albums WHERE albumID = ? AND isDelete = 0`, album_id_str);
	let album_data = album_result[0];

	let artist_result = null;
	if (album_data.artist) {
		const album_artist_id = album_data.artist;
		[artist_result] = await pool.query("SELECT * FROM touhoudbtest.artists WHERE artistID IN (?) AND isDelete = 0", [album_artist_id]);
	}

	let album_title = album_data.title;
	var album_artist_name = "";
	if (artist_result.length == 1) {
		album_artist_name = artist_result[0].name;
	} else if (artist_result.length > 1) {
		for (let i = 0; i < album_data.artist.length; i++) {
			for (let j = 0; j < artist_result.length; j++) {
				if (album_data.artist[i] == artist_result[j].artistID) {
					if (i + 2 > album_data.artist.length) {
						album_artist_name += artist_result[j].name;
					} else {
						album_artist_name += artist_result[j].name + " / ";
					}
					break;
				}
			}
		}
	} else {
		album_artist_name = "n/a";
	}

	let track_listing_id = album_data.trackList;

	// eslint-disable-next-line no-unused-vars
	const [track_listing, _] = await pool.query(`SELECT * FROM touhoudbtest.songs WHERE songID IN (${track_listing_id}) AND isDelete = 0`);
	var track_listing_block = "";
	if (track_listing) {
		for (let i = 0; i < track_listing.length; i++) {
			track_listing_block += `<li><a href="/song${track_listing[i].songID}">${track_listing[i].title}</a></li>`;
		}
	} else {
		track_listing_block = "<p>n/a</p>";
	}

	return {album_title, album_artist_name, track_listing_block};
}

module.exports = get_album_page_data;
