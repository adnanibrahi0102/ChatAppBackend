import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";

export const sendMessageController = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({
      message: "Message Sent Successfully",
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while sending message",
      success: false,
      error,
    });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { id: userToChartId } = req.params;
    console.log(userToChartId);
    const senderId = req.user;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [userToChartId, senderId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting messages",
      success: false,
      error,
    });
  }
};
