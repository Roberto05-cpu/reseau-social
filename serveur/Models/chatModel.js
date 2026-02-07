const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      }
    ]
  },
  { timestamps: true }
);

// Index unique pour éviter les conversations dupliquées entre les mêmes deux utilisateurs
chatSchema.index({ members: 1 }, { unique: true });

const chatModel = mongoose.model("chat", chatSchema)

module.exports = chatModel
