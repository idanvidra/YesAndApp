const httpStatus = require("http-status-codes");
const User = require("../models/userModel");

module.exports = {
    async GetAllUsers(req, res) {
        await User.find({})
            .populate("games.gameId")
            .then((result) => {
                res.status(httpStatus.StatusCodes.OK).json({
                    message: "Got all users successfully",
                    result,
                });
            })
            .catch((err) => {
                res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Couldn't return all users",
                    err,
                });
            });
    },
};
