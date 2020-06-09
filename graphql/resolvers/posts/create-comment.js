const { UserInputError } = require('apollo-server');

const Post = require('../../../models/Post');

const checkAuth = require('../../../utils/check-auth');
const validateCommentInput = require('../../../validation/comment');

/* -------------------------------------------------------------------------- */

const createComment = async (postID, body, context) => {
  const { name, username } = checkAuth(context);

  if (!postID.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error('Invalid ID');
  }

  const { errors, isValid } = validateCommentInput({ body });

  if (!isValid) {
    throw new UserInputError('Empty comment', { errors });
  }

  const post = await Post.findById(postID).catch((err) => {
    throw new Error(err);
  });

  if (!post) {
    throw new UserInputError('Post not found');
  }

  post.comments.unshift({
    name,
    username,
    body,
  });

  const res = await post.save().catch((err) => {
    throw new Error(err);
  });

  return res;
};

module.exports = createComment;
