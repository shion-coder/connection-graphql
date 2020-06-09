const Post = require('../../../models/Post');

/* -------------------------------------------------------------------------- */

const getPosts = async () => {
  const posts = await Post.find()
    .sort({ date: -1 })
    .catch((err) => {
      throw new Error(err);
    });

  if (!posts) {
    throw new Error('No posts found');
  }

  return posts;
};

module.exports = getPosts;
