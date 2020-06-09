const { Schema, model } = require('mongoose');

/* -------------------------------------------------------------------------- */

const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const User = model('users', userSchema);

module.exports = User;
