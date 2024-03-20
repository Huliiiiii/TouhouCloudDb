const express = require("express");
const router = express.Router();
const app = express();
const sequelize = require("../../database/query");
const Release = require("../../database/models/release");

app.use(express.urlencoded({extended: false}));

// const mysql = require("mysql2/promise");
// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "KitsuneMySQLPw2333==",
//     database: "touhoudbtest",
//     connectionLimit: 10, // Adjust the connection limit as per your requirements
// });

// async function executeQuery(sql) {
//     const connection = await pool.getConnection();
//     try {
//         // eslint-disable-next-line no-unused-vars
//         const [result] = await connection.query(sql);
//         return result;
//     } catch (error) {
//         console.log(error);
//         return [];
//     } finally {
//         connection.release();
//     }
// }

// router.get("/list/albums", async function (req, res) {
//     try {
//         const release_data = await executeQuery("SELECT * FROM touhoudbtest.release");
//         const formattedDateData = await executeQuery('SELECT DATE_FORMAT(release_date, "%Y-%m-%d") AS ReleseDate FROM touhoudbtest.release');
//         res.render("list_albums", {
//             release_data,
//             formattedDateData,
//         });
//
//         console.log(release_data);
//     } catch (error) {
//         console.log(error);
//         // Handle error
//     }
// });

router.get("/old/list/albums", async function (req, res) {
    try {
        await sequelize.authenticate();
        const release_data = await Release.findAll();
        const formattedDateData = await Release.findAll({
            attributes: [[sequelize.fn('DATE_FORMAT', sequelize.col('release_date'), '%Y-%m-%d'), 'ReleaseDate']]
        });
        res.render("list_albums", {
            release_data,
            formattedDateData,
        });
        // console.log(release_data);
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

// var viewAlbums = "SELECT * FROM touhoudbtest.release";
// var formattedDate = 'SELECT DATE_FORMAT(release_date, "%Y-%m-%d") AS ReleseDate FROM touhoudbtest.release';

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