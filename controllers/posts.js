const handleError = require("../service/handleError");
const handleSuccess = require("../service/handleSuccess");
const Post = require("../models/postsModel");
const User = require("../models/usersModel");

const posts = {
  async getPosts(req, res) {
    // 貼文時間排序
    // asc 遞增(由小到大，由舊到新) createdAt
    // desc 遞減(由大到小、由新到舊) "-createdAt"
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt";
    // 貼文關鍵字搜尋
    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const posts = await Post.find(q)
      .populate({
        // user 欄位要帶入 usersModel 的 name, image
        path: "user",
        select: "name image",
      })
      .sort(timeSort);
    handleSuccess(res, posts, 200);
  },
  async createdPost(req, res) {
    try {
      const { body } = req;
      if (body.content) {
        const newPost = await Post.create({
          user: body.user,
          content: body.content,
          tags: body.tags,
          type: body.type,
        });
        handleSuccess(res, newPost, 201);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async updatedPost(req, res) {
    try {
      const id = req.params.id;
      const updatePost = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      handleSuccess(res, updatePost, 200);
    } catch (err) {
      handleError(res, err);
    }
  },
  async deletePosts(req, res) {
    try {
      await Post.deleteMany({});
      res
        .status(200)
        .send({
          status: "success",
          message: "全部貼文已成功刪除",
        })
        .end();
    } catch (err) {
      handleError(res, err);
    }
  },
  async deletePost(req, res) {
    try {
      const id = req.params.id;
      await Post.findByIdAndDelete(id);
      const posts = await Post.find();
      handleSuccess(res, posts, 200);
    } catch (err) {
      handleError(err);
    }
  },
};

module.exports = posts;
