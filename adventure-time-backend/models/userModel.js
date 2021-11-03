const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nickname: { type: String },
});

module.exports = mongoose.model("User", userSchema);
