import gql from 'graphql-tag';

/* -------------------------------------------------------------------------- */

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
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

export const GET_POST = gql`
  query getPost($postID: ID!) {
    getPost(postID: $postID) {
      id
      name
      username
      body
      date
      likes {
        id
        name
        username
        date
      }
      likeCount
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
