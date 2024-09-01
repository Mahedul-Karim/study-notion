const Conversation = require("../model/conversation");
const Message = require("../model/message");
const catchAsync = require("../util/catchAsync");

exports.getConversations = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const conversations = await Conversation.find({
    $or: [
      {
        creatorId: userId,
      },
      {
        recieverId: userId,
      },
    ],
  })
    .populate("creatorId","firstName lastName image")
    .populate("recieverId","firstName lastName image");

  if (!conversations || conversations.length === 0) {
    return res.status(200).json({
      success: true,
      conversations: [],
    });
  }

  res.status(200).json({
    success: true,
    conversations,
  });
});

exports.getConversation = catchAsync(async (req, res) => {
  const { creatorId, recieverId } = req.body;

  const existingConversation = await Conversation.findOne({
    creatorId,
    recieverId,
  })
    .populate("creatorId", "firstName lastName image")
    .populate("recieverId", "firstName lastName image");

  if (!existingConversation) {
    return res.status(200).json({
      success: false,
      message: "No conversation found",
    });
  }

  res.status(200).json({
    success: true,
    conversations: existingConversation,
  });
});

exports.createMessage = catchAsync(async (req, res) => {
  const senderId = req.user._id;

  const { recieverId, text, isFirst } = req.body;

  if (!req.body.conversationId && isFirst) {
    const conversation = await Conversation.create({
      creatorId: senderId,
      recieverId,
      lastMessageSender: senderId,
      lastMessage: text,
    });
    req.body.conversationId = conversation._id;
  }

  const message = await Message.create({
    senderId,
    recieverId,
    text,
    conversationId: req.body.conversationId,
  });

  if(!isFirst){
    await Conversation.findByIdAndUpdate(req.body.conversationId,{
      lastMessage:text,
      lastMessageSender: senderId,
    })
  }

  res.status(201).json({
    success: true,
    message,
  });
});

exports.getMessages = catchAsync(async (req, res) => {
  const { conversationId } = req.query;

  if (conversationId === "undefined") {
    return res.status(200).json({
      success: true,
      message: [],
    });
  }

  const message = await Message.find({ conversationId })
    .populate("senderId","image")
    .populate("recieverId","image");

  if (!message || message.length === 0) {
    return res.status(200).json({
      success: true,
      message: [],
    });
  }

  res.status(200).json({
    success: true,
    message,
  });
});
