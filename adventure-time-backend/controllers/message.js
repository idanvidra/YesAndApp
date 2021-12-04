const HttpStatus = require("http-status-codes");

const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

module.exports = {
    SendMessage(req, res) {
        const senderId = req.params.senderId; // given from the route
        const receiverId = req.params.receiverId;
        // check if both users had a conversation before
        Conversation.find(
            {
                $or: [
                    // check if any of them sent a message to the other
                    {
                        participants: {
                            $elemMatch: {
                                senderId: senderId,
                                receiverId: receiverId,
                            },
                        },
                    },
                    {
                        participants: {
                            $elemMatch: {
                                senderId: receiverId,
                                receiverId: senderId,
                            },
                        },
                    },
                ],
            },
            async (err, result) => {
                if (result.length > 0) {
                    // they already talked
                    console.log("they already talked");
                } else {
                    // console.log(result);
                    // first time they talked
                    const newConversation = new Conversation();
                    newConversation.participants.push({
                        senderId: senderId,
                        receiverId: receiverId,
                    });

                    const saveConversation = await newConversation.save();

                    const newMessage = new Message();
                    newMessage.conversationId = saveConversation._id;
                    newMessage.sender = req.user.nickname;
                    newMessage.receiver = req.body.receiverName;
                    newMessage.message.push({
                        senderId: senderId,
                        receiverId: senderId,
                        senderName: req.user.nickname,
                        recieverName: req.body.receiverName,
                        body: req.body.message,
                    });

                    await newMessage
                        .save()
                        .then(() =>
                            res
                                .status(HttpStatus.StatusCodes.OK)
                                .json({ message: "message sent succesfully" })
                        )
                        .catch((err) =>
                            res
                                .status(
                                    HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR
                                )
                                .json({ message: "failed to send message" })
                        );
                }
            }
        );
    },
};
