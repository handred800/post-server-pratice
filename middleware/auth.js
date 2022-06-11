const jwt = require('jsonwebtoken');
const User = require('../models/user');

const appError = require('../service/appError');

// JWT decode;
const jwtDecode = function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, paylod) => {
            if(err) {
                reject(err);
            } else {
                resolve(paylod);
            }
        })
    })
} 

const Auth = {
    async isAuth (req, res, next) {
        let token;

        // 驗證 headers.authorization 欄位
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            return next(appError(401, 'tokenMissing', next));
        }

        const tokenData = await jwtDecode(token);
        if(!tokenData) return next(appError(401, 'tokenInvalid', next));
        
        // 傳遞當前使用者
        const currentUser = await User.findOne({id: tokenData.id});

        req.user = currentUser;
        next();
    },
    createJWT (payload) {
        return jwt.sign({
            id: payload.id,
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        })
    }
}

module.exports = Auth;