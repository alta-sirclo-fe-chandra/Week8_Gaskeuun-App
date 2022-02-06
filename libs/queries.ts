import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query SIGN_IN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      code
      message
      token
      user {
        id
        name
        password
        imageUrl
      }
    }
  }
`;
