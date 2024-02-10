const express = require("express");
const router = express.Router();
const app = express();

// eslint-disable-next-line no-unused-vars
const fs = require("fs");
app.use(express.urlencoded({extended: false}));

router.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

module.exports = router;
