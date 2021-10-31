const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  signup,
  check,
  signout,
  oauth,
} = require("../controller/userController");
const { checkToken } = require("../middleware/checkToken");

router.get("/logout", checkToken, logout);

router.post("/login", login);
router.post("/check", check);
router.post("/signup", signup);

router.delete("/signout", checkToken, signout);

router.post("/oauth", oauth);

module.exports = router;
