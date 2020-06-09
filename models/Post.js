const { Schema, model } = require('mongoose');

/* -------------------------------------------------------------------------- */

const postSchema = new Schema({
  name: String,
  username: String,
  body: String,
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
  likes: [
    {
      name: String,
      username: String,
      date: {
        type: String,
        default: () => new Date().toISOString(),
      },
    },
  ],
  comments: [
    {
      name: String,
      username: String,
      body: String,
      date: {
        type: String,
        default: () => new Date().toISOString(),
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Post = model('posts', postSchema);

module.exports = Post;
