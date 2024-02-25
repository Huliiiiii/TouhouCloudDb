const router = require("express").Router();

const { pool } = require("../../functions/query.js");
// 曲目

router.post("/dev/edit/song", async (req, res) => {
	try {
		const data = req.body;

		let query_statement;
		// prettier-ignore
		// eslint-disable-next-line no-inner-declarations
		// function str_to_object(str) {
		// 	if (str == null) return null;
		// 	return JSON.stringify(str.split(",").map(item => item.trim()));
		let artist_arr = [];
		if (data.artist) {
			artist_arr = Array.from(data.artist).filter((item) => !isNaN(item) && item != " ");
		}
		const data_value = [data.title, JSON.stringify(artist_arr), data.credits, data.duration, data.lyrics ? JSON.stringify(data.lyrics) : null];
		if (!isNaN(data.id)) {
			data_value.push(data.id);
			query_statement = `UPDATE touhoudbtest.song SET title = ?, artist = ?, credits = ?, duration = ?, lyrics = ? WHERE id = ?`;
		} else {
			query_statement = `INSERT INTO touhoudbtest.artist SET
				id = ?,
				title = ?,
				artist = ?,
				credits = ?,
				duration = ?
				`;
		}
		pool.query(query_statement, data_value);
		// console.log(pool.format(query_statement, data_value));
		res.send(data);
	} catch (error) {
		console.log(error);
		res.status(500).send(Error(error));
	}
});

module.exports = router;
