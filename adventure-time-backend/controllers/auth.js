const Joi = require("joi");
const httpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const Helpers = require("../Helpers/helpers");

module.exports = {
    async createUser(req, res) {
        // schema for the authentication form
        // Joi checks if the form was filled out correctly
        const schema = Joi.object().keys({
            nickname: Joi.string().alphanum().min(3).max(30).required(),
        });

        // display error if the form was not filled out correctly
        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res
                .status(httpStatus.StatusCodes.BAD_REQUEST)
                .json({ message: error.details });
        }

        // check if nickname exists
        const nickname = await User.findOne({
            nickname: Helpers.lowerCase(req.body.nickname),
        });
        if (nickname) {
            return res
                .status(httpStatus.StatusCodes.CONFLICT)
                .json({ message: "nickname already exists" });
        }

        const temp_password = "123456";

        return bcrypt.hash(temp_password, 10, (err, hash) => {
            if (err) {
                return res
                    .status(httpStatus.StatusCodes.BAD_REQUEST)
                    .json({ message: "Error hashing nothing" });
            }
            const body = {
                nickname: Helpers.firstUpperCase(value.nickname),
            };
            // save to database
            User.create(body).then((user) => {
                res.status(httpStatus.StatusCodes.CREATED).json({
                    message: "User created successfuly",
                    user,
                });
            });
        });
    },
};
