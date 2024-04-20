# 從 express MVC 架構建立 RESTful API

## A. 建立 express --no-view 專案
### 1. 建立環境
   - cd 資料夾
   - express --no-view 專案名稱
   - cd 專案名稱
   - npm install
   - npm start
   - git init
---
### 2. 安裝套件
   - npm install cors
   - npm install mongoose
   - npm install dotenv
---
### 3. 建立 .gitignore
   1. ```
         *.env
         node_modules/
         .DS_Store
      ```
   2. `git add .`
   3. `git status` 確認 ignore 是否正確忽略
   4. 建立新的 Git repo
   5. git commit -m "建立環境"
   6. 連線至遠端 Git repo
### 4. 載入 cors、app.use(cors())
### 5. 連線至 mongoDB 本地端資料庫
   1. mongod
      `mongod --dbpath data 資料夾路徑--logpath mongo.log 資料夾路徑`
   2. mongosh
      `mongosh`
---
### 6. 連線至 mongoDB 遠端資料庫
   1. 建立 **config.env**
      - PORT=3005
      - DATABASE=mongodb+srv://runweiting:<password>@cluster0.3hr0gmk.mongodb.net/新增DB名稱?retryWrites=true&w=majority&appName=Cluster0
      - DATABASE_PASSWORD=密碼
   2. 建立 **example.env**
   3. 載入 **dotenv**
   4. 匯入 **config.env**
      - dotenv.config({ path: "./config.env" });
      const DB = process.env.DATABASE.replace(
         "<password>",
         process.env.DATABASE_PASSWORD
      );
   5. mongoose.connect(DB)
---



## B. 編輯 app.js
   1. 拆出 connections/index.js
   2. 拆出 controllers/posts.js
      - 匯入 handleError, handleSuccess
      - 匯入 ../models/postsModels
      - const posts
        - 各種 Controllers 方法
   3. routes/posts
      - 匯入 ../controllers/posts
      - 在 router.method("路徑", 各種 Controllers 方法)
---

## C. 將 Node web server 部屬至 Render 主機

### 前往 Render 建立 Web Service
   1. build and deploy from a Git repo
   2. Build Command
      `$npm install`
   3. Start Command
      `$npm start`
   4. 加入環境變數
      - add from .env
      - 貼上 config.env
      - 本地端 PORT 號不用加入
   5. 上傳 postman collection
