const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
      // Date.now 以 schema 被定義的時間戳記作為預設值
      // Date.now() 立即執行函數，以每次創建一個新文檔時的時間
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
