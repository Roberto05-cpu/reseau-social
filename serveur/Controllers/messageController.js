const chatModel = require("../Models/chatModel");
const messageModel = require("../Models/messageModel");

// creer un message
const createMessageController = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { chatId, text } = req.body;

    if (!chatId || !text) {
      return res
        .status(400)
        .json({ success: false, message: "chatId et text sont requis" });
    }

    // Vérifier si le chat existe et si l'utilisateur en fait partie
    const chat = await chatModel.findById(chatId);
    if (!chat || !chat.members.includes(senderId)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Vous ne pouvez pas envoyer de message ici",
        });
    }

    const message = new messageModel({ chatId, sender: senderId, text });
    await message.save();

    // 🔥 Temps réel : envoyer le message au receveur s'il est en ligne
    const receiverId = chat.members.find(id => id.toString() !== senderId.toString());
    if (global.onlineUsers.has(receiverId.toString())) {
      const socketId = global.onlineUsers.get(receiverId.toString());
      global.io.to(socketId).emit("receiveMessage", {
        _id: message._id,
        chatId: message.chatId,
        sender: message.sender,
        text: message.text,
        createdAt: message.createdAt,
      });
    }

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la creation du message. API",
    });
  }
};

const getAllMessageForChatController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { chatId } = req.params;

    const chat = await chatModel.findById(chatId);
    if (!chat || !chat.members.includes(userId)) {
      return res.status(403).json({ success: false, message: "Accès refusé à cette conversation" });
    }

    const messages = await messageModel.find({ chatId }).sort({ createdAt: 1 }); // du plus ancien au plus récent

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recuperation des messages du chat. API",
    });
  }
};

const markMessageAsReadController = async (req,res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const message = await messageModel.findById(id);
    if (!message) return res.status(404).json({ success: false, message: "Message introuvable" });

    const chat = await chatModel.findById(message.chatId);
    if (!chat.members.includes(userId)) return res.status(403).json({ success: false, message: "Accès refusé" });

    message.isRead = true;
    await message.save();

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors du marquage du message comme lue. API",
    });
  }
}

const getAllMessageNotReadController = async (req,res) => {
  try {
    const userId = req.user.id;

    // 1. récupérer les chats du user
    const chats = await chatModel.find({
      members: { $in: [userId] },
    }).select("_id");

    const chatIds = chats.map(chat => chat._id);

    // 2. compter les messages non lus
    const unreadCount = await messageModel.countDocuments({
      chatId: { $in: chatIds },
      sender: { $ne: userId }, // pas ses propres messages
      isRead: false,
    });

    res.status(200).json({
      success: true,
      unreadCount,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recuperation des messages non lues. API",
    });
  }
}

// récupérer les messages non lus par chat
const getUnreadCountPerChatController = async (req,res) => {
  try {
    const userId = req.user.id;

    // 1. récupérer les chats du user
    const chats = await chatModel.find({
      members: { $in: [userId] },
    }).select("_id");

    // 2. pour chaque chat, compter les messages non lus
    const unreadPerChat = {};
    for (const chat of chats) {
      const unreadCount = await messageModel.countDocuments({
        chatId: chat._id,
        sender: { $ne: userId }, // pas ses propres messages
        isRead: false,
      });
      unreadPerChat[chat._id] = unreadCount;
    }

    res.status(200).json({
      success: true,
      unreadPerChat,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recuperation des messages non lues par chat. API",
    });
  }
}

module.exports = { createMessageController , getAllMessageForChatController , markMessageAsReadController, getAllMessageNotReadController, getUnreadCountPerChatController};
