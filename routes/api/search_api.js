const router = require("express").Router();
const { escapeId } = require("mysql2");
const { pool } = require("../../functions/query.js");
const { if_A_Return_B_else_C } = require("../../src/scripts/little_tools.js");
/**
 *
 * @param {Array<String,Array<String>>} column
 * @returns {String}
 */
function columnProcessor(column) {
	// 接收到的是一个数组
	let column_str = column.toString(column);
	let column_arr = column_str.split(/,\s*/);
	return if_A_Return_B_else_C(column !== "*" && column !== "" && column !== undefined, escapeId(column_arr), "*");
}

// 艺术家
router.get("/api/search/artist", async (req, res) => {
	try {
		if (req.query.keyword) {
			// let column = columnProcessor(req.query.target);
			let column = "*";
			//
			let keyword = req.query.keyword;
			let name = `%${keyword}%`;
			//
			let query_statement = isNaN(keyword)
				? `SELECT ${column} FROM artist WHERE name LIKE ? OR LOWER(name_variant ->> "$") LIKE LOWER(?) AND is_deleted = 0`
				: `SELECT ${column} FROM artist WHERE name LIKE ? OR LOWER(name_variant ->> "$") LIKE LOWER(?) OR id = ? AND is_deleted = 0`;
			// eslint-disable-next-line no-unused-vars
			const [result] = await pool.query(query_statement, [name, name, keyword]);
			// console.log(pool.format(query_statement, [name, name, keyword]));
			// console.log(result);
			res.send(result);
		} else if (req.query.id && !isNaN(parseFloat(req.query.id))) {
			// let column = columnProcessor(req.query.target);
			let column = "*";
			//
			let id = req.query.id;
			let query_statement = `SELECT ${column} FROM touhoudbtest.artist WHERE id = ? AND is_deleted = 0 `;
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
			let column = "*";
			//
			let keyword = req.query.keyword;
			let title = `%${keyword}%`;
			//
			let query_statement = isNaN(keyword)
				? `SELECT ${column} FROM touhoudbtest.song WHERE title LIKE ? AND is_deleted = 0`
				: `SELECT ${column} FROM touhoudbtest.song WHERE title LIKE ? OR id = ? AND is_deleted = 0`;
			// eslint-disable-next-line no-unused-vars
			// console.log(pool.format(query_statement, [title, keyword]));
			const [result] = await pool.query(query_statement, [title, keyword]);
			// console.log(result);
			res.send(result);
		} else if (req.query.id && !isNaN(parseFloat(req.query.id))) {
			let column = "*";
			//
			let id = req.query.id;
			let query_statement = `SELECT ${column} FROM touhoudbtest.song WHERE id = ? AND is_deleted = 0`;
			// eslint-disable-next-line no-unused-vars
			const [result] = await pool.query(query_statement, id);
			// console.log(pool.format(query_statement, id));
			res.send(result);
		} else {
			res.status(500).send(Error("Invalid request"));
		}
	} catch (error) {
		console.error("Error executing the query:", error);
		res.status(500).send(Error("Error while executing the query"));
	}
});
// 发行
router.get("/api/search/release", async (req, res) => {
	try {
		if (req.query.keyword) {
			let column = "*";
			//
			let keyword = req.query.keyword;
			let title = `%${keyword}%`;
			//
			let query_statement = isNaN(keyword)
				? `SELECT ${column} FROM touhoudbtest.release WHERE title LIKE ? AND is_deleted = 0`
				: `SELECT ${column} FROM touhoudbtest.release WHERE title LIKE ? OR id = ? AND is_deleted = 0`;
			// eslint-disable-next-line no-unused-vars
			// console.log(pool.format(query_statement, [title, keyword]));
			const [result] = await pool.query(query_statement, [title, keyword]);
			// console.log(result);
			res.send(result);
		} else if (req.query.id && !isNaN(parseFloat(req.query.id))) {
			let column = "*";
			//
			let id = req.query.id;
			let query_statement = `SELECT ${column} FROM touhoudbtest.release WHERE id = ? AND is_deleted = 0`;
			// eslint-disable-next-line no-unused-vars
			const [result] = await pool.query(query_statement, id);
			// console.log(pool.format(query_statement, id));
			res.send(result);
		} else {
			res.status(500).send(Error("Invalid request"));
		}
	} catch (error) {
		console.error("Error executing the query:", error);
		res.status(500).send(Error("Error while executing the query"));
	}
});

module.exports = router;
