const mongoose = require('mongoose')

const notifiSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  type: { type: String, enum: ["like", "comment", "follow"] , required: true},
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

const notifModel = mongoose.model("notif", notifiSchema)

module.exports = notifModel
