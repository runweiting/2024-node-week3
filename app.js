// 載入 express 框架
var express = require("express");
// 載入 Node.js 的 path 模組，處理文件路徑
var path = require("path");
// 載入 cookie-parser 中間件，解析 HTTP 請求中的 cookie
var cookieParser = require("cookie-parser");
// 載入 morgan 中間件，記錄 HTTP 請求的日誌
var logger = require("morgan");
// 載入 mongoose
const mongoose = require("mongoose");
// 載入 express cors
const cors = require("cors");
// 載入 dotenv
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((res) => console.log("mongoDB 本地端資料庫連線成功"));

// 載入 indexRouter 路由模組，定義 app.js 的根路由
var indexRouter = require("./routes/index");
// 載入 usersRouter 路由模組，定義 app.js 的用戶路由
var usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

// 建立 Express 實例，將其賦值給變數 app
var app = express();
app.use(cors());
// 使用 morgan 中間件，將日誌記錄到控制台，格式為 'dev'
app.use(logger("dev"));
// 使用 express.json 中間件，用於解析 HTTP 請求中的 JSON 格式的數據
app.use(express.json());
// 使用 express.urlencoded 中間件，用於解析 HTTP 請求中的 URL-encoded 格式的數據
app.use(express.urlencoded({ extended: false }));
// 使用 cookie-parser 中間件，用於解析 HTTP 請求中的 cookie
app.use(cookieParser());
// 使用 express.static 中間件，將指定目錄 public 下的靜態文件提供給客戶端
app.use(express.static(path.join(__dirname, "public")));

// 將根路由指向 indexRouter 路由模組
app.use("/", indexRouter);
// 將 /users 指向 usersRouter 路由模組
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
// 在所有路由之後，處理 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, the page you're looking for doesn't exist.");
});

// 導出 app，使其可以在其他地方載入並啟動
module.exports = app;
