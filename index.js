const express = require("express");
const router = express.Router();
const app = express();

// eslint-disable-next-line no-unused-vars
const fs = require("fs");
app.use(express.urlencoded({extended: false}));

router.get("/", function (req, res) {
	// eslint-disable-next-line no-undef
	res.sendFile(__dirname + "/index.html");
});

module.exports = router;
