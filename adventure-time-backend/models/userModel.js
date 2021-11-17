const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nickname: { type: String },
    games: [
        {
            gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
            game: { type: String },
            created: { type: Date, default: Date.now() },
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
