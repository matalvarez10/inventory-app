const express = require('express');
const router = express.Router();
const system_controller = require("../controllers/systemController");

router.get("/:id",system_controller.filter_by_system);

module.exports = router;