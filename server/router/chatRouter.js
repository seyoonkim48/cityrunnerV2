const express = require("express");
const router = express.Router();
const { getMessage } = require("../controller/chatController");
const { checkToken } = require("../middleware/checkToken");

router.get("/", checkToken, getMessage);

module.exports = router;
