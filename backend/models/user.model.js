const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // mongoose will automatically trim whitespaces
      minlength: 3,
    },
  },
  {
    timestamps: true, // automatically creates timestamps about when it was created, last updated, etc.
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;