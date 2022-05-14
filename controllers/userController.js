const User = require('../models/user')
const { successHandler, errorHandler } = require('../service/responseHandler.js');

const users = {
    async getUser(req, res) {
        try {
            const id = req.params.id;
            const data = await User.findById(id);
            successHandler(res, data);
        } catch (error) {
            errorHandler(res, error);
        }
    },
}

module.exports = users;