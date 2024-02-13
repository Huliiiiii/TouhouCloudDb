const router = require("express").Router();
const { pool } = require("../../functions/query.js");
router.get("/api/search_artist", async (req, res) => {
	const search_content = req.query.keyword;
	try {
		let query_statement = `SELECT * FROM touhoudbtest.artist WHERE name LIKE '%${search_content}%' `;
		if (!isNaN(parseFloat(search_content))) {
			query_statement += `OR artist_id Like ${search_content} AND is_deleted = 0 `;
		} else {
			query_statement += `AND is_deleted = 0`;
		}
		// eslint-disable-next-line no-unused-vars
		const [result, _] = await pool.query(query_statement);
		res.send(result);
	} catch (error) {
		console.error("Error executing the query:", error);
		res.status(500).send("Error executing the query");
	}
});

module.exports = router;
