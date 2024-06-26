const { handleError, handleSuccess } = require("../service/handler");
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
    handleSuccess(res, "查詢成功", posts);
  },
  async createdPost(req, res) {
    try {
      const { body } = req;
      // 手動檢查必填欄位
      if (!body.user || !body.content) {
        throw new Error("姓名及內容為必填");
      }
      const newPost = await Post.create({
        user: body.user,
        content: body.content.trim(),
        image: body.image,
        likes: body.likes,
      });
      handleSuccess(res, "新增成功", newPost);
    } catch (err) {
      handleError(res, err.message);
    }
  },
  async updatedPost(req, res) {
    try {
      const { body } = req;
      const id = req.params.id;
      // 手動檢查必填欄位
      if (!body.user || !body.content) {
        throw new Error("姓名及內容為必填");
      }
      const updatePost = await Post.findByIdAndUpdate(
        id,
        {
          user: body.user,
          content: body.content.trim(),
          image: body.image,
          likes: body.likes,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (updatePost !== null) {
        handleSuccess(res, "更新成功", updatePost);
      } else {
        throw new Error("查無此貼文 id");
      }
    } catch (err) {
      handleError(res, err.message);
    }
  },
  async deletePosts(req, res) {
    try {
      const route = req.originalUrl.split("?")[0];
      if (route === "/posts/") {
        throw new Error("請提供正確的貼文 id");
      } else {
        await Post.deleteMany({});
        handleSuccess(res, "全部刪除成功");
      }
    } catch (err) {
      handleError(res, err.message);
    }
  },
  async deletePost(req, res) {
    try {
      const id = req.params.id;
      const deletePost = await Post.findByIdAndDelete(id);
      if (deletePost !== null) {
        handleSuccess(res, "刪除成功", deletePost);
      } else {
        throw new Error("查無此貼文 id");
      }
    } catch {
      handleError(res, "查無此貼文 id");
    }
  },
};

module.exports = posts;
