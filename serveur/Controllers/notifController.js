const notifModel = require("../Models/notifModel");

// recevoir ses notifs
const getMyNotifController = async (req, res) => {
  try {
    const notifs = await notifModel
      .find({ receiverId: req.user._id })
      .populate("senderId", "name avatar")
      .populate("postId", "message picture video")
      .sort({ createdAt: -1 });

    console.log(notifs)
    res.status(200).send({
      success: true,
      message: "Toutes vos notifications",
      notifs
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la reception de tous les notifs. API",
    });
  }
};

const markAllReadNotifController = async (req,res) => {
  try {
    await notifModel.updateMany(
      {receiverId : req.user._id, isRead: false},
      {isRead : true}
    )

     res.status(200).json({
      success: true,
      message: "Notifications marquées comme lues",
    });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors du marquage des notfs comme lues. API",
    });
  }
}

// compter les notifs non lues
const countUnReadNotifsController = async (req,res) => {
  try {
    const count = await notifModel.countDocuments({
      receiverId: req.user._id,
      isRead: false,
    });

    res.status(200).json({ success: true, count });
  } catch (error) {
    console.log(error.message.bgRed.white);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recuperation des notifs non lues. API",
    });
  }
}

module.exports = { getMyNotifController , markAllReadNotifController, countUnReadNotifsController};
