const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// router
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

// mongo DB 連線
dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB).then(() => {console.log('DB connected')})

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

app.use(function(req, res, next) {
    res.status(404).json({
        status: false,
        message: '不存在的路由'
    })
})

module.exports = app;
