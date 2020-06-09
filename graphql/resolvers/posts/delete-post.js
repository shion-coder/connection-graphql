const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../../models/Post');

const checkAuth = require('../../../utils/check-auth');

/* -------------------------------------------------------------------------- */

const deletePost = async (postID, context) => {
  const { username } = checkAuth(context);

  if (!postID.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error('Invalid ID');
  }

  const post = await Post.findById(postID).catch((err) => {
    throw new Error(err);
  });

  if (!post) {
    throw new UserInputError('Post not found');
  }

  if (username !== post.username) {
    throw new AuthenticationError('Action not allowed');
  }

  await post.delete().catch((err) => {
    throw new Error(err);
  });

  return 'Post deleted successfully';
};

module.exports = deletePost;
