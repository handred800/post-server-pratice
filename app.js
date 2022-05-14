const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { successHandler, errorHandler } = require('./service/responseHandler');

// router
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const postRouter = require('./routes/post');

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
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/post', postRouter);

module.exports = app;
