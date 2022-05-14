const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');

/* GET users listing. */
router.post('/', post.createPost);
router.delete('/:id', post.deletePost);
router.patch('/:id', post.updatePost);


module.exports = router;
