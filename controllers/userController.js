const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/user');
const { createJWT } = require('../middleware/auth');
const { tokenHandler, successHandler } = require('../service/responseHandler');
const appError = require('../service/appError');

const users = {
    async signUp(req, res, next) {
        const { name, email, password, confirmPassword } = req.body;
        // 驗證欄位
        if(!name, !email || !password || !confirmPassword) return next(appError(400, 'filedMissing', next));
        if(!validator.isEmail(email)) return next(appError(400, 'emailInvalid', next));
        if(!validator.isStrongPassword(password)) return next(appError(400, 'passwordNotStrong', next));
        if( password !== confirmPassword) return next(appError(400, 'passwordNotSame', next));
        // 建立使用者資料
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hashPassword,
            name
        });
        // 回傳 token
        const token = createJWT(newUser);
        tokenHandler(res, 201, token);
    },
    async signIn(req, res, next) {
        const { email, password } = req.body;
        // 驗證欄位
        if(!email || !password) return next(appError(400, 'filedMissing', next));
        if(!validator.isEmail(email)) return next(appError(400, 'emailInvalid', next));

        // 驗證 user, 密碼預設被保護 '+password' 來指定獲取 
        const currentUser = await User.findOne({ email }, '+password');
        if(!currentUser) return next(400, 'userInvalid', next);

        // 驗證 password
        const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);
        if(isPasswordCorrect) {
            // 回傳 token
            const token = createJWT(currentUser);
            successHandler(res, token);
        } else {
            return next(appError(400, 'passwordOrEmailWrong', next));
        }

    },
    async getUserData(req, res) {
        successHandler(res ,req.user);
    },
    async updateUserData(req, res, next) {
        const { body, user: currentUser} = req;
        console.log(body)
        const theUser = await User.findByIdAndUpdate(currentUser.id, body, { runValidators: true });
        successHandler(res, '資料修改成功');
    },
    async resetPassword(req, res, next) {
        const { body, user: currentUser} = req;
        const { password, confirmPassword } = body;

        // 驗證欄位
        if(!password || !confirmPassword) return next(appError(400, 'filedMissing', next));
        if(!validator.isStrongPassword(password)) return next(appError(400, 'passwordNotStrong', next));
        if( password !== confirmPassword) return next(appError(400, 'passwordNotSame', next));

        await User.findByIdAndUpdate(currentUser.id, { password });
        successHandler(res, '密碼已變更');
    },
}

module.exports = users;