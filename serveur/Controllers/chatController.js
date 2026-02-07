const chatModel = require("../Models/chatModel");
const messageModel = require("../Models/messageModel");

// creer un chat
const createChatController = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id; // l'utilisateur connecté

    if (!receiverId) {
      return res
        .status(400)
        .json({ success: false, message: "ReceiverId est requis" });
    }

    if (receiverId === senderId) {
      return res.status(400).json({
        success: false,
        message: "Vous ne pouvez pas chatter avec vous-même",
      });
    }

    // Vérifier si la conversation existe déjà
    let chat = await chatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      // Si elle n'existe pas, créer une nouvelle conversation
      chat = new chatModel({ members: [senderId, receiverId] });
      await chat.save();
    }

    res.status(200).send({
      success: true,
      message: "Chat cree avec success. commencew a discuter",
      chat,
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la reception de tous les notifs. API",
    });
  }
};

// recuperer tous les chats d'un user
const getUserChatController = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await chatModel.find({ members: { $in: [userId] } }).sort({
      updatedAt: -1,
    });

    // Ajouter le dernier message pour chaque chat
    const chatsWithLastMessage = await Promise.all(
      chats.map(async (chat) => {
        const lastMessage = await messageModel
          .findOne({ chatId: chat._id })
          .sort({ createdAt: -1 });
        
        return {
          ...chat.toObject(),
          lastMessage: lastMessage?.text || "",
          lastMessageTime: lastMessage?.createdAt || chat.updatedAt
        };
      })
    );

    res.status(200).json({ 
      success: true,
      message: "Tous vos chats recupere avec success", 
      chats: chatsWithLastMessage 
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la reception de tous les notifs. API",
    });
  }
};

module.exports = { createChatController, getUserChatController };
