import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SIGN_UP($name: String!, $email: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password }) {
      code
      message
    }
  }
`;

export const EDIT_USER = gql`
  mutation EDIT_USER(
    $name: String
    $email: String
    $password: String
    $imageUrl: String
  ) {
    editUser(
      edit: {
        name: $name
        email: $email
        password: $password
        imageUrl: $imageUrl
      }
    ) {
      code
      message
    }
  }
`;
