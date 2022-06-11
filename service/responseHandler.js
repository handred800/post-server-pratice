module.exports = {
    successHandler(res, data) {
        if(typeof(data) === 'string') {
            // 純文字訊息
            res.json({
                status: true,
                message: data
            });
        } else {
            res.json({
                status: true,
                data
            });
        }
        res.end();
    },
    tokenHandler(res, statusCode, token) {
        res.status(statusCode).json({
            status: true,
            token
        })
        res.end();
    },
    errorHandler(res, error, statusCode = 400, stack) {
        res.status(statusCode).json({
            status: false,
            error,
            stack
        });
        res.end();
    }
};