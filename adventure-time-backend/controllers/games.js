const Joi = require("joi");

module.exports = {
    // function for saving game
    SaveGame(req, res) {
        // schema for the saving game
        // Joi checks if the form was filled out correctly
        const schema = Joi.object().keys({
            player: Joi.string().alphanum().min(3).max(30).required(),
            nickname: Joi.string().alphanum().min(3).max(30).required(),
            game: Joi.string.required(),
            created: Joi.date(),
        });

        // display error if the form was not filled out correctly
        const { error } = schema.validate(req.body);
        if (error && error.details) {
            return res
                .status(httpStatus.StatusCodes.BAD_REQUEST)
                .json({ msg: error.details });
        }
    },

    // TODO: (video 89)
    // 1. get details for schema
    // 2. create the game in the DB
    // 3. assync (video 91) add game to user
};
