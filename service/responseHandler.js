module.exports = {
    successHandler(res, data) {
        res.json({
            status: true,
            data
        });
        res.end()
    },
    errorHandler(res, error, statusCode = 400) {
        res.status(statusCode).json({
            status: false,
            error,
        });
        res.end();
    }
};