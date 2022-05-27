const errorDictionary = {
    'userInvalid': '無效的 User',
    'noContent': '請填寫內容',
    'idInvalid': '無效的 ID',

    
}

const appError = (statusCode, message, next) => {
    const msg = errorDictionary.hasOwnProperty(message) ? errorDictionary[message] : message;
    const error = new Error(msg);
    error.statusCode = statusCode;
    error.isOperational = true;
    next(error);
}

module.exports = appError;