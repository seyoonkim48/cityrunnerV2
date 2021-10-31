const express = require("express");

const multer = require("multer");
const upload = multer({ dest: "upload/" });

const router = express.Router();
const { getImage, uploadImage } = require("../Controller/imageController");
const { checkToken } = require("../middleware/checkToken");

router.get("/:key", checkToken, getImage);
router.post("/", upload.single("image"), checkToken, uploadImage);

module.exports = router;
