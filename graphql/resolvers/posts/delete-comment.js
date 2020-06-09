const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../../models/Post');

const checkAuth = require('../../../utils/check-auth');

/* -------------------------------------------------------------------------- */

const deleteComment = async (postID, commentID, context) => {
  const { username } = checkAuth(context);

  if (!postID.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error('Invalid Post ID');
  }

  if (!commentID.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error('Invalid Comment ID');
  }

  const post = await Post.findById(postID).catch((err) => {
    throw new Error(err);
  });

  if (!post) {
    throw new UserInputError('Post not found');
  }

  const commentIndex = post.comments.findIndex((comment) => comment.id === commentID);

  if (commentIndex === -1) {
    throw new UserInputError('Comment not found');
  }

  if (username !== post.comments[commentIndex].username) {
    throw new AuthenticationError('Action not allowed');
  }

  post.comments.splice(commentIndex, 1);

  const res = await post.save().catch((err) => {
    throw new Error(err);
  });

  return res;
};

module.exports = deleteComment;
