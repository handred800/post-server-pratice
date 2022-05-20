const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');


router.post('/post/', post.createPost);
router.delete('/post/:id', post.deletePost);
router.patch('/post/:id', post.updatePost);

router.get('/posts/', post.getPosts);
router.delete('/posts/', post.deleteAllPosts);

module.exports = router;
