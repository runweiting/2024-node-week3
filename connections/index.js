// 載入 mongoose
const mongoose = require("mongoose");
// 載入 dotenv
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((res) => console.log("mongoDB 本地端資料庫連線成功"));
