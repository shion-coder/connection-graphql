const { gql } = require('apollo-server');

/* -------------------------------------------------------------------------- */

const typeDefs = gql`
  input RegisterInput {
    name: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    date: String!
    token: String!
  }

  type Like {
    id: ID!
    name: String!
    username: String!
    date: String!
  }

  type Comment {
    id: ID!
    name: String!
    username: String!
    body: String!
    date: String!
  }

  type Post {
    id: ID!
    name: String!
    username: String!
    body: String!
    date: String!
    likes: [Like]
    comments: [Comment]
    likeCount: Int
    commentCount: Int
  }

  type Query {
    getPosts: [Post]
    getPost(postID: ID!): Post
  }

  type Mutation {
    register(input: RegisterInput!): User
    login(username: String!, password: String!): User
    createPost(body: String!): Post
    deletePost(postID: ID!): String
    likePost(postID: ID!): Post
    createComment(postID: ID!, body: String!): Post
    deleteComment(postID: ID!, commentID: ID!): Post
  }

  type Subscription {
    newPost: Post
  }
`;

module.exports = typeDefs;
