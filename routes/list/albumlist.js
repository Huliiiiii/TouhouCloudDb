const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({extended: false}));

const mysql = require("mysql2/promise");
const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "KitsuneMySQLPw2333==",
	database: "touhoudbtest",
	connectionLimit: 10 // Adjust the connection limit as per your requirements
});

async function executeQuery(sql) {
	const connection = await pool.getConnection();
	try {
		// eslint-disable-next-line no-unused-vars
		const [result, _] = await connection.query(sql);
		return result;
	} catch (error) {
		console.log(error);
		return [];
	} finally {
		connection.release();
	}
}

router.get("/list/albums", async function (req, res) {
	try {
		const albumData = await executeQuery("SELECT * FROM touhoudbtest.albums");
		const formattedDateData = await executeQuery('SELECT DATE_FORMAT(ReleasedDate, "%Y-%m-%d") AS ReleseDate FROM touhoudbtest.albums');
		res.render("list_albums", {
			albumData,
			formattedDateData
		});
	} catch (error) {
		console.log(error);
		// Handle error
	}
});

module.exports = router;

// 手写的备份
// const express = require("express");
// const router = express.Router();
// const app = express();
// app.use(express.urlencoded({extended: false}));

// const mysql = require("mysql2");
// const db = mysql.createPool({
// 	host: "localhost",
// 	user: "root",
// 	password: "KitsuneMySQLPw2333==",
// 	database: "touhoudbtest"
// });

// var viewAlbums = "SELECT * FROM touhoudbtest.albums";
// var formattedDate = 'SELECT DATE_FORMAT(ReleasedDate, "%Y-%m-%d") AS ReleseDate FROM touhoudbtest.albums';

// db.query(viewAlbums, function (err, result) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		albumData = result;
// 	}
// });
// db.query(formattedDate, function (err, result) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		formattedDateData = result;
// 	}
// });
// router.get("/list/albums", function (req, res, next) {
// 	res.render("list_albums", {
// 		albumData,
// 		formattedDateData,
// 		songData
// 	});
// });

// module.exports = router;
