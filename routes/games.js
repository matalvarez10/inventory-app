const express = require('express');
const router = express.Router();
const game_controller = require("../controllers/videogameController");

  //const upload = multer({ storage });
/* GET users listing. */

router.get('/create', game_controller.videogame_create_get);

router.post('/create', game_controller.videogame_create_post);

router.get('/:id/update', game_controller.videogame_update_get);

router.post('/:id/update', game_controller.videogame_update_post);

router.post('/:id/delete', game_controller.videogame_delete_post);

router.get('/:id', game_controller.videogame_detail);

router.get('/', game_controller.all_videogames);

module.exports = router;
