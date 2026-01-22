const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },
    comments: [
      {
        commenterId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
