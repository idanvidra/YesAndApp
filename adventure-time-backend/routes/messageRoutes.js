const express = require("express");
const router = express.Router();

const MessageCtrl = require("../controllers/message");
const AuthHelper = require("../Helpers/authHelper");

router.post(
    "/chat-message/:senderId/:receiverId",
    AuthHelper.VerifyToken,
    MessageCtrl.SendMessage
);
module.exports = router;
