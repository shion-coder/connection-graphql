const { UserInputError } = require('apollo-server');

const Post = require('../../../models/Post');

const checkAuth = require('../../../utils/check-auth');

/* -------------------------------------------------------------------------- */

const likePost = async (postID, context) => {
  const { name, username } = checkAuth(context);

  if (!postID.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error('Invalid ID');
  }

  const post = await Post.findById(postID).catch((err) => {
    throw new Error(err);
  });

  if (!post) {
    throw new UserInputError('Post not found');
  }

  if (post.likes.find((like) => like.username === username)) {
    // Post already like, unlike it
    post.likes = post.likes.filter((like) => like.username !== username);
  } else {
    // Not liked, like post
    post.likes.unshift({
      name,
      username,
    });
  }

  const res = await post.save().catch((err) => {
    throw new Error(err);
  });

  return res;
};

module.exports = likePost;
