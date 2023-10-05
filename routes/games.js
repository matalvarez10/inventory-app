const express = require('express');
const router = express.Router();
const game_controller = require("../controllers/videogameController");

/* GET users listing. */

router.get('/', game_controller.all_videogames);

router.get('/:id', game_controller.videogame_detail);

module.exports = router;
