const express = require("express");
const router = express.Router();
const app = express();
const fs = require("fs");
app.use(express.urlencoded({extended: false}));

router.get("/index.html", function (req, res, next) {
	res.sendFile(__dirname + "/index.html");
});

module.exports = router;
