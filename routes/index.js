const express = require('express');
const router = express.Router();
const game_controller = require("../controllers/videogameController");


/* GET home page. */
router.get('/', game_controller.index);

module.exports = router;