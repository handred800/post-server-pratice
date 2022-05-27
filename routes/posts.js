const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');
const catchAsync = require('../service/catchAsync');

router.post('/post/', catchAsync(post.createPost));
router.delete('/post/:id', catchAsync(post.deletePost));
router.patch('/post/:id', catchAsync(post.updatePost));

router.get('/posts/', catchAsync(post.getPosts));
router.delete('/posts/', catchAsync(post.deleteAllPosts));

module.exports = router;
