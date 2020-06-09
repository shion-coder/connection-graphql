import gql from 'graphql-tag';

/* -------------------------------------------------------------------------- */

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      name
      username
      body
      date
      likes {
        id
        username
        date
      }
      comments {
        id
        username
        body
        date
      }
      likeCount
      commentCount
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postID: ID!) {
    likePost(postID: $postID) {
      id
      likeCount
      likes {
        id
        name
        username
        date
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postID: ID!) {
    deletePost(postID: $postID)
  }
`;
