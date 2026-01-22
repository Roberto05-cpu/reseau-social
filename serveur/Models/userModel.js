const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    likes: [
      {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
      }
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;