const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "貼文姓名未填寫"],
    },
    content: {
      type: String,
      required: [true, "Content 未填寫"],
    },
    image: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      // Date.now 和 Date.now() 的差異？
      // Date.now 新增貼文時，時間戳為當下時間，select 為 false 查詢不會返回此欄位，表示此時間戳在建立後不會再被修改
      // Date.now() 在每次修改時，時間戳都為當下時間
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
