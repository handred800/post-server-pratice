const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { errorHandler } = require('./service/responseHandler.js');
const { devErrorLog, prodErrorLog } = require('./service/errorLog');

// router
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

// mongo DB 連線
dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB)
    .then(() => {console.log('DB connected')})
    .catch((err) => {console.log(err)})

// express
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use(userRouter);
app.use(postsRouter);

app.use((req, res, next) => {
    errorHandler(res, '不存在的路由', 404);
})

// 錯誤處理
app.use((err, req, res, next) => {
    if(process.env.NODE_ENV === 'DEV') {
        devErrorLog(err, res);
    } else {
        prodErrorLog(err, res);
    }
})

// 預期外錯誤 catch
process.on('uncaughtException', (err) => {
	console.error('Uncaughted Exception!')
	console.error(err);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('未捕捉到的 rejection:', promise, '原因：', reason);
});

module.exports = app;
