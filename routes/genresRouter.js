const express = require('express');
const router = express.Router();
const genre_controller = require("../controllers/genreController");

router.get("/create",genre_controller.genre_create_get);
router.post("/create",genre_controller.genre_create_post);

router.get("/:id",genre_controller.filter_by_genres);
router.get("/detail/:id",genre_controller.get_genre_detail);

router.get("/",genre_controller.get_all_genres);

module.exports = router;