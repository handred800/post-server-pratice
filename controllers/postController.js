const mongoose = require('mongoose');
const Post = require("../models/post");
const User = require('../models/user')
const { successHandler } = require('../service/responseHandler');
const appError = require('../service/appError');

const posts = {
  async getPosts(req, res, next) {
    const { sort, keyword } = req.query;
    const sortType = sort === 'asc' ? 'createdAt' : '-createdAt';
    const allPosts = await Post.find({ content: new RegExp(keyword) })
      .sort(sortType)
      .populate({ path: 'user', select: 'name photo' });
    successHandler(res, allPosts);
  },
  async createPost(req, res, next) {
    const { body } = req;
    // 檢查 objectId 格式
    const UserIsValid = mongoose.Types.ObjectId.isValid(body.user);
    if (!UserIsValid) return next(appError(400, 'userInvalid', next));
    // 檢查 User 是否存在
    const theUser = await User.findById(body.user).exec();
    if (!theUser) return next(appError(400, 'userInvalid', next));
    // 檢查有無內容
    if (!body.content) return next(appError(400, 'noContent', next));
    const newPost = await Post.create({
      user: body.user,
      content: body.content,
      image: body.image,
      type: body.type,
      tags: body.tags,
    })
    successHandler(res, newPost);
  },
  async deleteAllPosts(req, res, next) {
    const deletePosts = await Post.deleteMany();
    successHandler(res, []);
  },
  async deletePost(req, res, next) {
    const id = req.params.id;
    // 檢查 objectId 格式
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) return appError(400, 'idInvalid', next);
    // 檢查 Post 是否存在
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) appError(400, 'idInvalid', next);
    const allPosts = await Post.find();
    successHandler(res, allPosts);
  },
  async updatePost(req, res, next) {
    const id = req.params.id;
    const { body } = req;
    // 檢查 objectId 格式
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) appError(400, 'idInvalid', next);
    // 檢查 User 
    if (!mongoose.Types.ObjectId.isValid(body.user)) appError(400, 'userInvalid', next);
    const theUser = await User.findById(body.user).exec();
    if (!theUser) return next(appError(400, 'userInvalid', next));
    // 檢查 Post 是否存在
    const updatePost = await Post.findByIdAndUpdate(id, body, { runValidators: true });
    if (!updatePost) appError(400, 'idInvalid', next);
    const allPosts = await Post.find();
    successHandler(res, allPosts);
  },
}

module.exports = posts;