import gql from 'graphql-tag';

/* -------------------------------------------------------------------------- */

export const CREATE_COMMENT = gql`
  mutation createComment($postID: ID!, $body: String!) {
    createComment(postID: $postID, body: $body) {
      id
      name
      username
      body
      date
      comments {
        id
        name
        username
        body
        date
      }
      commentCount
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postID: ID!, $commentID: ID!) {
    deleteComment(postID: $postID, commentID: $commentID) {
      id
      comments {
        id
        name
        username
        body
        date
      }
      commentCount
    }
  }
`;
