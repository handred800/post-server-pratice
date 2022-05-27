const { errorHandler } = require('./responseHandler');

module.exports = {
    devErrorLog: (err, res) => {
        console.log(err);
        errorHandler(res, err.message, err.statusCode, err.stack);
    },
    prodErrorLog: (err, res) => {
        if(err.isOperational) {
            errorHandler(res, err.message, err.statusCode);
        } else {
            errorHandler(res, '系統錯誤，請洽詢工程師', 500);
        }
    }
}


