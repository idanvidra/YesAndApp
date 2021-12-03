const HttpStatus = require("http-status-codes");

const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

module.exports = {
    SendMessage(req, res) {
        const senderID = req.params.senderID; // given from the route
        const recieverId = req.params.recieverId;
        console.log(req.user._id);
        console.log(senderID, recieverId);
        // check if both users had a conversation before
        Conversation.find(
            {
                $or: [
                    // check if any of them sent a message to the other
                    {
                        participants: {
                            $elemMatch: {
                                // senderID: senderID,
                                // recieverId: recieverId,
                                senderID: req.params.senderID,
                                recieverId: req.params.recieverId,
                            },
                        },
                        participants: {
                            $elemMatch: {
                                // senderID: recieverId,
                                // recieverId: senderID,
                                senderID: req.params.recieverId,
                                recieverId: req.params.senderID,
                            },
                        },
                    },
                ],
            },
            async (err, result) => {
                if (result.length > 0) {
                    // they already talked
                } else {
                    // first time they talked
                    const newConversation = new Conversation();
                    newConversation.participants.push({
                        senderID: req.user._id,
                        recieverId: req.params.recieverId,
                    });

                    const saveConversation = await newConversation.save();

                    console.log(saveConversation);
                }
            }
        );
    },
};
