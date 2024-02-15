const mysql2 = require("mysql2/promise");
const pool = mysql2.createPool({
	host: "localhost",
	user: "root",
	password: "KitsuneMySQLPw2333==",
	database: "touhoudbtest",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// async function get_data(column, table, is_deleted, where) {
// 	try {
// 		var query = "SELECT " + column + " FROM " + table;
// 		if (is_deleted && !where) {
// 			query += " WHERE is_deleted = " + is_deleted;
// 		}
// 		if (where && !is_deleted) {
// 			query += " WHERE " + where;
// 		}
// 		if (where && is_deleted) {
// 			query += " WHERE is_deleted = " + is_deleted + " AND " + where;
// 		}
// 		// console.log("query: " + query);
// 		// eslint-disable-next-line no-unused-vars
// 		const [result, _] = await pool.query(query);
// 		// console.log(result);
// 		return result;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

module.exports = { pool };
