const express = require("express");
const router = express.Router();
const { getMycrew } = require("../controller/mycrewController");

const { checkToken } = require("../middleware/checkToken");

router.get("/", checkToken, getMycrew);

module.exports = router;
