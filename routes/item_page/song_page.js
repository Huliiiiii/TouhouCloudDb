const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({extended: false}));

router.get("/song:id", function (req, res) {
	res.render("./item_page/song_page");
});

module.exports = router;
