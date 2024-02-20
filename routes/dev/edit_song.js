const router = require("express").Router();

const { pool } = require("../../functions/query.js");
// 曲目
router.post("/dev/edit/song", async (req, res) => {
	try {
		const data = req.body;
		// prettier-ignore
		// eslint-disable-next-line no-inner-declarations
		// function str_to_object(str) {
		// 	if (str == null) return null;
		// 	return JSON.stringify(str.split(",").map(item => item.trim()));
		// }

		const data_value = [
			data.title,
			data.artist,
			data.credits,
			data.duration,
			data.lyrics ? data.lyrics : null,
		];
		if (!isNaN(data.id)) {
			data_value.push(data.id);
			console.log(data_value);
			pool.query(
				`UPDATE touhoudbtest.song SET
				title = ?,
				artist = ?,
				credits = ?,
				duration = ?,
				lyrics = ?
				WHERE id = ?`,
				data_value,
			);
			res.send("ok");
		} else {
			pool.query(
				`INSERT INTO touhoudbtest.artist SET
				id = ?,
				title = ?,
				artist = ?,
				credits = ?,
				duration = ?
				`,
				data_value,
			);
			res.send("ok");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(Error(error));
	}
});

module.exports = router;
