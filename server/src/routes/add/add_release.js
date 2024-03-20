const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: false }));

router.get("/add/release", (req, res) => {
	res.render("./add/add_release");
});

module.exports = router;
