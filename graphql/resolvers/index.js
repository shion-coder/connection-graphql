const postsResolvers = require('./posts');
const usersResolvers = require('./users');

/* -------------------------------------------------------------------------- */

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};

module.exports = resolvers;
