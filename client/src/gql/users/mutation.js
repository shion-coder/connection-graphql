import gql from 'graphql-tag';

/* -------------------------------------------------------------------------- */

export const REGISTER = gql`
  mutation register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      input: { name: $name, username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }
    ) {
      id
      name
      username
      email
      date
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      username
      email
      date
      token
    }
  }
`;
