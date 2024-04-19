var express = require("express");
var router = express.Router();
const Post = require("../models/postsModels");

// GET 取得全部
router.get("/", async function (req, res, next) {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    posts,
  });
});
// POST 新增單筆
router.post("/", async function (req, res, next) {
  try {
    const newPost = await Post.create(req.body);
    // 201 請求成功且伺服器已新增新的資源
    res.status(201).json({
      status: "success",
      newPost,
    });
  } catch (err) {
    // 當發生錯誤時，將錯誤傳遞給下一個中間件函數來進行錯誤處理
    next(err);
  }
});
// PATCH 編輯單筆
router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const updatePost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      updatePost,
    });
  } catch (err) {
    next(err);
  }
});
// DELETE 刪除全部
router.delete("/", async function (req, res, next) {
  try {
    await Post.deleteMany({});
    res.status(200).json({
      status: "success",
      message: "全部貼文已成功刪除",
    });
  } catch (err) {
    next(err);
  }
});
// DELETE 刪除單筆
router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      posts,
    });
  } catch (err) {
    next(err);
  }
});
// OPTIONS
router.options("/", async function (req, res, next) {
  res.status(200);
});

module.exports = router;
