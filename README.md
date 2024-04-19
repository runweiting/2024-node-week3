# 從 express MVC 架構建立 RESTful API

## A. 建立 express --no-view 專案
### 1. 建立環境
   - cd 資料夾
   - express --no-view 專案名稱
   - cd 專案名稱
   - npm install
   - npm start
---
### 2. 安裝套件
   - npm install mongoose
   - npm install cors
---
### 3. 編輯 app.js
   1. 載入 **cors**
      - 匯入 cors
      - 在 app 之後 `app.use(cors())`      
   2. 載入 **mongoose**、連線至本地端預設位置
      - 匯入 mongoose
      - `mongoose
      .connect("mongodb://localhost:27017/新增資料庫名稱")
      .then(() => console.log('資料庫連接成功'));
      .catch((err) => console.log(err.reason, "資料庫連線失敗"))`
---
### 4. 連線至 mongoDB 本地端資料庫
   1. mongod
      `mongod --dbpath data 資料夾路徑--logpath mongo.log 資料夾路徑`
   2. mongosh
      `mongosh`
---
### 5. 新增 posts 路由、新增 postsModels.js
   1. 新增 **../models/postsModels.js**
      - 匯入 mongoose
      - 使用 mongoose.Schema 建立 postSchema
      - 使用 mongoose.model 建立 Post
   2. 新增 **./routes/posts.js**
      - 匯入 Post
      - 撰寫 router controller
         1. **GET**
           - router.get("/", ...)
             - Post.find()
             - 200
         2. **404**
           - 在所有路由之後，處理 404
            `
             app.use((req, res, next) => { res.status(404).send("Sorry, the page you're looking for doesn't exist.")})
            `
         3. **POST**
           - router.post("/", ...)
             - try {...} catch (err) {...}
             - Post.create(req.body)
             - 201
         4. **PATCH 編輯單筆**
           - try {...} catch (err) {...}
           - router.patch("/:id", ...)
           - Post.findByIdAndUpdate(id, req.body, { new: true })
           - 201
         5. **DELETE 刪除所有**
           - try {...} catch (err) {...}
           - router.delete("/", ...)
           - Post.deleteMany()
           - 200
         6. **DELETE 刪除單筆**
           - try {...} catch (err) {...}
           - router.delete("/:id", ...)
           - Post.findByIdAndDelete(id)
           - 200
         7. **OPTIONS**
           - router.option("/", ...)
           - 200
---

## B. 改連線至 mongoDB 遠端資料庫
### 1. 安裝 dotenv
   1. `npm install dotenv`
   2. 建立 **config.env**
      - PORT=3005
      - DATABASE=mongodb+srv://runweiting:<password>@cluster0.3hr0gmk.mongodb.net/新增DB名稱?retryWrites=true&w=majority&appName=Cluster0
      - DATABASE_PASSWORD=密碼
   3. 載入 **dotenv**
   4. 匯入 **config.env**
      - dotenv.config({ path: "./config.env" });
      const DB = process.env.DATABASE.replace(
         "<password>",
         process.env.DATABASE_PASSWORD
      );
---
### 2. 連線至 mongoDB 遠端資料庫
   - mongoose.connect(DB)
---

## C. 將 Node web server 部屬至 Render 主機
### 1. 建立 .gitignore
      `
         *.env
         node_modules/
         .DS_Store
      `
### 2. git init、git add .、git status
   1. git status 確認 ignore 是否正確忽略
   2. 建立新的 Git repo
   3. git commit -m "建立環境"
   4. 連線至遠端 Git repo
### 3. 前往 Render 建立 Web Service
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
