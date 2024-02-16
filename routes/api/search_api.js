const router = require("express").Router();

const { escapeId } = require("mysql2");
const { pool } = require("../../functions/query.js");
const { if_A_Return_B_else_C } = require("../../src/scripts/little_tools.js");

function columnProcessor(target) {
	return if_A_Return_B_else_C(target !== "*" && target !== "" && target !== undefined, escapeId(target), "*");
}

// 艺术家
router.get("/api/search/artist", async (req, res) => {
	try {
		if (req.query.keyword) {
			let column = columnProcessor(req.query.target);
			//
			let keyword = req.query.keyword;
			let name = `%${keyword}%`;
			//
			let query_statement = isNaN(keyword)
				? `SELECT ${column} FROM artist WHERE name LIKE ? OR LOWER(aliases ->> "$") LIKE LOWER(?) AND is_deleted = 0`
				: `SELECT ${column} FROM artist WHERE name LIKE ? OR LOWER(aliases ->> "$") LIKE LOWER(?) OR artist_id = ? AND is_deleted = 0`;
			// eslint-disable-next-line no-unused-vars
			const [result] = await pool.query(query_statement, [name, name, keyword]);
			// console.log(pool.format(query_statement, [name, name, keyword]));
			// console.log(result);
			res.send(result);
		} else if (req.query.id && !isNaN(parseFloat(req.query.id))) {
			let column = columnProcessor(req.query.column);
			//
			let id = req.query.id;
			let query_statement = `SELECT ${column} FROM touhoudbtest.artist WHERE artist_id = ? AND is_deleted = 0 `;
			// eslint-disable-next-line no-unused-vars
			const [result] = await pool.query(query_statement, id);
			res.send(result);
		} else {
			res.status(500).send(Error("Invalid request"));
		}
	} catch (error) {
		console.error("Error executing the query:", error);
		res.status(500).send(Error("Error while executing the query"));
	}
});

// 曲目
router.get("/api/search/song", async (req, res) => {
	try {
		if (req.query.keyword) {
			let column = columnProcessor(req.query.target);
			//
			let keyword = req.query.keyword;
			let title = `%${keyword}%`;
			//
			let query_statement = isNaN(keyword)
				? `SELECT ${column} FROM touhoudbtest.song WHERE title LIKE ? OR AND is_deleted = 0`
				: `SELECT ${column} FROM touhoudbtest.song WHERE title LIKE ? OR song_id = ? AND is_deleted = 0`;
			// eslint-disable-next-line no-unused-vars
			const [result] = await pool.query(query_statement, [title, keyword]);
			res.send(result);
		} else if (req.query.id && !isNaN(parseFloat(req.query.id))) {
			let column = columnProcessor(req.query.column);
			//
			let id = req.query.id;
			let query_statement = `SELECT ${column} FROM touhoudbtest.song WHERE song_id = ? AND is_deleted = 0`;
			// eslint-disable-next-line no-unused-vars
			const [result] = await pool.query(query_statement, id);
			res.send(result);
		} else {
			res.status(500).send(Error("Invalid request"));
		}
	} catch (error) {
		console.error("Error executing the query:", error);
		res.status(500).send("Error while executing the query");
	}
});

module.exports = router;
