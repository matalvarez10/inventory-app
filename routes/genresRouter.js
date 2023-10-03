const express = require('express');
const router = express.Router();
const genre_controller = require("../controllers/genreController");

router.get("/:id",genre_controller.filter_by_genres);

module.exports = router;