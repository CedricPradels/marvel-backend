const mongoose = require("mongoose");

const User = mongoose.model("User", {
  account: {
    email: {
      type: String,
      unique: true
    },
    salt: String,
    hash: String,
    token: String
  },
  favorites: {
    characters: Array,
    comics: Array
  }
});

module.exports = User;
