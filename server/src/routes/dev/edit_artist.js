const router = require("express").Router();

const { pool } = require("../../functions/query.js");
// 曲目
router.post("/dev/edit/artist", async (req, res) => {
	try {
		const data = req.body;
		// prettier-ignore
		// eslint-disable-next-line no-inner-declarations
		function str_to_object(str) {
			if (str == null) return null;
			return JSON.stringify(str.split(",").map(item => item.trim()));
		}
		const data_value = [
			data.name ? data.name : null,
			data.name_variant ? str_to_object(data.name_variant) : null,
			data.alias ? str_to_object(data.alias) : null,
			data.artist_type,
			data.birth_or_formed_date ? data.birth_or_formed_date : null,
			data.member_of ? str_to_object(data.member_of) : null,
			data.members,
			data.related_artist,
			data.ncm_id ? data.ncm_id : null,
		];
		if (!isNaN(data.id)) {
			data_value.push(data.id);
			pool.query(
				`UPDATE touhoudbtest.artist SET
				name = ?,
				name_variant = ?,
				alias = ?,
				artist_type = ?,
				birth_or_formed_date = ?,
				member_of = ?,
				members = ?,
				related_artist = ?,
				ncm_id = ?
				WHERE id = ?`,
				data_value,
			);
			res.send("ok");
		} else {
			pool.query(
				`INSERT INTO touhoudbtest.artist SET
				name = ?,
				name_variant = ?,
				alias = ?,
				artist_type = ?,
				birth_or_formed_date = ?,
				member_of = ?,
				members = ?,
				related_artist = ?,
				ncm_id = ?`,
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
