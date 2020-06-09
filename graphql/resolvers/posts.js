const getPosts = require('./posts/get-posts');
const getPost = require('./posts/get-post');
const createPost = require('./posts/create-post');
const deletePost = require('./posts/delete-post');
const likePost = require('./posts/like-post');
const createComment = require('./posts/create-comment');
const deleteComment = require('./posts/delete-comment');

/* -------------------------------------------------------------------------- */

const postsResolvers = {
  Query: {
    getPosts: () => getPosts(),

    getPost: (_, { postID }) => getPost(postID),
  },
  Mutation: {
    createPost: (_, { body }, context) => createPost(body, context),

    deletePost: (_, { postID }, context) => deletePost(postID, context),

    likePost: (_, { postID }, context) => likePost(postID, context),

    createComment: (_, { postID, body }, context) => createComment(postID, body, context),

    deleteComment: (_, { postID, commentID }, context) => deleteComment(postID, commentID, context),
  },

  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
};

module.exports = postsResolvers;
