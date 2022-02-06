import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SIGN_UP($name: String!, $email: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password }) {
      code
      message
    }
  }
`;
