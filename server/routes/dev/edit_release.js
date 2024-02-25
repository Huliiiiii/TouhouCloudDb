const router = require("express").Router();

const { pool } = require("../../functions/query.js");
// 曲目
router.post("/dev/edit/release", async (req, res) => {
	try {
		const data = req.body;
		if (isNaN(data.release_artist)) {
			throw new Error("Invalid release artist");
		}
		// const track_listing = data.track_listing.replace(/\\/g, "");
		const data_value = [
			data.title,
			JSON.parse(data.release_artist),
			data.override_credit_name == "" ? null : data.override_credit_name,
			data.release_date == "" ? null : data.release_date,
			data.publisher == "" ? null : data.publisher,
			data.catalog_num == "" ? null : data.catalog_num,
			data.track_listing == "" ? null : data.track_listing,
			data.classfier == "" ? null : data.classfier,
			data.ncm_id == "" ? null : data.ncm_id == "",
		];
		// res.send(data);
		if (!isNaN(data.id)) {
			data_value.push(data.id);
			pool.query(
				`UPDATE touhoudbtest.release SET title = ?, release_artist = '[?]', override_credit_name = ?, release_date = ?, publisher = ?, catalog_num = ?, track_listing = ?  , classfier = ?, ncm_id = ? WHERE id = ?`,
				data_value,
			);
			res.send("ok");
		} else {
			pool.query(
				`INSERT INTO touhoudbtest.release SET title = ?, release_artist = '[?]', override_credit_name = ?, release_date = ?, publisher = ?, catalog_num = ?, track_listing = ?, classfier = ?, ncm_id = ?`,
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
