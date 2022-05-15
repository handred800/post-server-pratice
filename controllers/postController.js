const Post = require("../models/post");
const User = require('../models/user')
const { successHandler, errorHandler } = require('../service/responseHandler');

const posts = {
  async getPosts(req, res) {
    try {
      const { sort, keyword } = req.params;
      const sortType = sort === 'asc' ? 'createdAt' : '-createdAt';
      const allPosts = await Post.find({ content: new RegExp(keyword) })
        .sort(sortType)
        .populate({ path: 'user', select: 'name photo' });
      successHandler(res, allPosts);
    } catch (error) {
      console.log(error)
      errorHandler(res, error);
    }
  },
  async createPost(req, res) {

    try {
      const { body } = req;
      if (!body.content) throw { message: '請填寫內容' };
      const newPost = await Post.create({
        user: body.user,
        content: body.content,
      })
      successHandler(res, newPost);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  async deleteAllPosts(req, res) {
    try {
      const deletePosts = await Post.deleteMany();
      const allPosts = await Post.find();
      successHandler(res, allPosts)
    } catch (error) {
      errorHandler(res, error);
    }
  },
  async deletePost(req, res) {
    const id = req.params.id;
    try {
      const deletePost = await Post.findByIdAndDelete(id);
      if (deletePost === null) throw { message: "查無ID" }
      const allPosts = await Post.find();
      successHandler(res, allPosts);
    } catch (error) {
      console.log(error);
      errorHandler(res, error)
    }
  },
  async updatePost(req, res) {
    const id = req.params.id;
    try {
      const postData = req.body;
      if (!postData.content) throw { message: "未填寫內容" }
      const updatePost = await Post.findByIdAndUpdate(id, postData, { runValidators: true });
      if (updatePost === null) throw { message: "查無ID" };
      const allPosts = await Post.find();
      successHandler(res, allPosts);
    }
    catch (error) {
      errorHandler(res, error)
    }
  },
}

module.exports = posts;