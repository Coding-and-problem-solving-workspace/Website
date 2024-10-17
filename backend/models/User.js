const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    githubId: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    firebaseUid: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
