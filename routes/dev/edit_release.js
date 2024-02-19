const router = require("express").Router();
// const { escapeId } = require("mysql2");
// const { pool } = require("../../functions/query.js");

// 曲目
router.post("/dev/edit/release", async (req, res) => {
	try {
		const data = req.body;
		res.send(data);
	} catch (error) {
		res.status(500).send(Error(error));
	}
});

module.exports = router;
