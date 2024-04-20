var express = require("express");
var router = express.Router();
const PostsControllers = require("../controllers/posts");

// GET 取得全部
router.get("/", PostsControllers.getPosts);
// POST 新增單筆
router.post("/", PostsControllers.createdPost);
// PATCH 編輯單筆
router.patch("/:id", PostsControllers.updatedPost);
// DELETE 刪除全部
router.delete("/", PostsControllers.deletePosts);
// DELETE 刪除單筆
router.delete("/:id", PostsControllers.deletePost);
// OPTIONS
router.options("/", async function (req, res, next) {
  res.status(200);
});

module.exports = router;
