const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');


/* GET users listing. */
router.get('/', post.getPosts);
router.delete('/', post.deleteAllPosts);

module.exports = router;
