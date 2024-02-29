const router = require("express").Router();
const { escapeId } = require("mysql2");
const { pool } = require("../../functions/query.js");
const { if_A_Return_B_else_C } = require("../../src/scripts/little_tools.js");
// 测试中用不到这个函数
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
// TODO: Status Code
// 重构
// 艺术家
router.get("/api/search/artist", async (req, res) => {
	try {
		// prettier-ingore
		let column = "*";
		if (req.query.keyword) {
			let name = `%${req.query.keyword}%`;
			let query_statement = `SELECT ${column} FROM artist WHERE name LIKE ? OR LOWER(name_variant ->> "$") LIKE LOWER(?) `;
			let query_value = [name, req.query.keyword];
			if (!isNaN(req.query.keyword)) {
				query_statement += `OR id = ? `;
				query_value.push(req.query.keyword);
			}
			query_statement += `AND is_deleted = 0`;
			const [result] = await pool.execute(query_statement, query_value);
			// console.log(pool.format(query_statement, query_value));
			res.send(result);
		} else if (req.query.id && !isNaN(parseFloat(req.query.id))) {
			let id_array = req.query.id
				.split(/[,]/)
				.map((item) => parseInt(item.trim(), 10))
				.filter((value) => !isNaN(value));
			let query_statement = `SELECT ${column} FROM touhoudbtest.artist WHERE id = ${id_array} AND is_deleted = 0 `;
			if (id_array.length > 1) {
				query_statement = `SELECT ${column} FROM touhoudbtest.artist WHERE id IN (${id_array}) AND is_deleted = 0 `;
			}
			const [result] = await pool.query(query_statement, req.query.id);
			res.send(result);
			// console.log("Query type: id, Result:", result);
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
		let column = "*";
		let query_statement = "";
		let [result] = [];
		// kewword
		if (req.query.keyword && isNaN(parseFloat(req.query.keyword))) {
			query_statement = `SELECT ${column} FROM touhoudbtest.song WHERE title LIKE ? AND is_deleted = 0`;
			[result] = await pool.query(query_statement, [req.query.keyword]);
			res.send(result);
		} else if (req.query.keyword && !isNaN(parseFloat(req.query.keyword))) {
			query_statement = `SELECT ${column} FROM touhoudbtest.song WHERE title LIKE ? OR id = ? AND is_deleted = 0`;
			[result] = await pool.query(query_statement, [req.query.keyword, req.query.keyword]);
			res.send(result);
		}
		// id
		else if (req.query.id && !isNaN(parseFloat(req.query.id))) {
			query_statement = `SELECT ${column} FROM touhoudbtest.song WHERE id = ? AND is_deleted = 0`;
			[result] = await pool.query(query_statement, req.query.id);
			res.send(result);
		}
		// 列表
		else if (req.query.type == "list" && req.query.page && !isNaN(parseFloat(req.query.page)) && req.query.pn && !isNaN(parseFloat(req.query.pn))) {
			const limit_a = (Number(req.query.page) - 1) * Number(req.query.pn);
			const limit_b = Number(req.query.page) * Number(req.query.pn);
			query_statement = `SELECT * FROM touhoudbtest.song WHERE is_deleted = 0 LIMIT ?, ?`;
			[result] = await pool.query(query_statement, [limit_a, limit_b]);
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
