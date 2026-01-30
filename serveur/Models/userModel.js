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
      maxLength: 1024,
      minLength: 6,
    },
    gender: {
        type: String,
        enum: ["Femme", "Homme"],
        required: true
    },
    date: {
        type: Date,
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
            ref: "post",
      }
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;