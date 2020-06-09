const { UserInputError } = require('apollo-server');

const Post = require('../../../models/Post');

const checkAuth = require('../../../utils/check-auth');
const validatePostInput = require('../../../validation/post');

/* -------------------------------------------------------------------------- */

const createPost = async (body, context) => {
  const user = checkAuth(context);

  const { errors, isValid } = validatePostInput({ body });

  if (!isValid) {
    throw new UserInputError('Empty post', { errors });
  }

  const newPost = new Post({
    name: user.name,
    username: user.username,
    body,
    user: user.id,
  });

  const res = await newPost.save().catch((err) => {
    throw new Error(err);
  });

  context.pubsub.publish('NEW_POST', {
    newPost: res,
  });

  return res;
};

module.exports = createPost;
