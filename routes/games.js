const express = require('express');
const router = express.Router();
const game_controller = require("../controllers/videogameController");

/* GET users listing. */

router.get('/create', game_controller.videogame_create_get);

router.post('/create', game_controller.videogame_create_post);

router.get('/:id', game_controller.videogame_detail);

router.get('/', game_controller.all_videogames);

module.exports = router;
