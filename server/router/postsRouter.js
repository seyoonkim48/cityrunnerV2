const express = require("express");
const router = express.Router();
const {
  posts,
  filterPage,
  getPost,
  updatePost,
  deletePost,
  joinCrew,
  exitCrew,
} = require("../controller/postsController");
const { checkToken } = require("../middleware/checkToken");

router.post("/", posts);
router.get("/", filterPage);
router.get("/:postId", getPost);
router.put("/:postId", checkToken, updatePost);
router.delete("/:postId", checkToken, deletePost);
router.put("/join/:postId", checkToken, joinCrew);
router.delete("/exit/:postId", checkToken, exitCrew);

module.exports = router;
