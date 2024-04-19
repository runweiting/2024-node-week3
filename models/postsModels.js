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
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
