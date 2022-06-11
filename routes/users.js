const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const user = require('../controllers/userController');
const catchAsync = require('../service/catchAsync');

router.post('/user/sign_up/', catchAsync(user.signUp));
router.post('/user/sign_in/', catchAsync(user.signIn));

router.get('/user/profile/', catchAsync(isAuth), catchAsync(user.getUserData));
router.patch('/user/profile/', catchAsync(isAuth), catchAsync(user.updateUserData));

router.post('/user/resetPassword', catchAsync(isAuth), catchAsync(user.resetPassword));
module.exports = router;