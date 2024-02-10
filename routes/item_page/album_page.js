const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({extended: false}));

const get_album_page_data = require("../../functions/get_album_page_data");

router.get("/album:id", async function (req, res) {
	try {
		const album_id = req.params.id;
		const albumData = await get_album_page_data(album_id);
		res.render("./item_page/album_page", albumData);
	} catch (error) {
		console.error(error);
		res.status(404).send("Album not found");
	}
});

module.exports = router;
