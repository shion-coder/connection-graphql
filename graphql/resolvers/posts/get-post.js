const { UserInputError } = require('apollo-server');

const Post = require('../../../models/Post');

/* -------------------------------------------------------------------------- */

const getPost = async (postID) => {
  if (!postID.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error('Invalid ID');
  }

  const post = await Post.findById(postID).catch((err) => {
    throw new Error(err);
  });

  if (!post) {
    throw new UserInputError('Post not found');
  }

  return post;
};

module.exports = getPost;
