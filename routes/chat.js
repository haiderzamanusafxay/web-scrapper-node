const express = require("express");
const router = express.Router();
const { scrap } = require("../controllers/chatController");

router.post("/scrap", scrap);

module.exports = router;
