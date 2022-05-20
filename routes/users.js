const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.get('/user/:id', user.getUser);

module.exports = router;