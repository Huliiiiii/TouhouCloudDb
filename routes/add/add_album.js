const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({extended: false}));

router.get("/add/album", (req, res) => {
	res.render("./add/add_album");
});

module.exports = router;
