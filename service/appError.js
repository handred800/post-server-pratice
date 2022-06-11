const errorDictionary = {
    'userInvalid': '無效的 User',
    'noContent': '請填寫內容',
    'idInvalid': '無效的 ID',
    'filedMissing': '欄位缺失',
    'emailInvalid': 'Email 格式錯誤',
    'passwordNotStrong': '密碼強度不足',
    'passwordNotSame': '兩次的密碼不相同',
    'passwordOrEmailWrong': 'Email 或密碼錯誤',
    'tokenMissing': 'token 缺失',
    'tokenInvalid': '無效的 token',
}

const appError = (statusCode, message, next) => {
    const msg = errorDictionary.hasOwnProperty(message) ? errorDictionary[message] : message;
    const error = new Error(msg);
    error.statusCode = statusCode;
    error.isOperational = true;
    next(error);
}

module.exports = appError;