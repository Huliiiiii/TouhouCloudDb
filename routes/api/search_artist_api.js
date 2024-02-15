const router = require("express").Router();
const { pool } = require("../../functions/query.js");

router.get("/api/search_artist", async (req, res) => {
	try {
		if (req.query.keyword) {
			let keyword = req.query.keyword;
			let query_statement = `SELECT * FROM touhoudbtest.artist WHERE name LIKE '%${keyword}%' OR LOWER(aliases ->> "$") Like LOWER('${keyword}')`;
			if (!isNaN(parseFloat(req.query.keyword))) {
				query_statement += `OR artist_id = ${keyword} AND is_deleted = 0 `;
			} else {
				query_statement += `AND is_deleted = 0`;
			}
			// eslint-disable-next-line no-unused-vars
			const [result, _] = await pool.query(query_statement);

			res.send(result);
		} else if (req.query.id && !isNaN(parseFloat(req.query.id))) {
			let query_statement = `SELECT * FROM touhoudbtest.artist WHERE artist_id = ${req.query.id} AND is_deleted = 0 `;
			// eslint-disable-next-line no-unused-vars
			const [result, _] = await pool.query(query_statement);
			res.send(result);
		} else {
			res.status(500).send("Invalid request");
		}
	} catch (error) {
		console.error("Error executing the query:", error);
		res.status(500).send("Error executing the query");
	}
});

module.exports = router;
