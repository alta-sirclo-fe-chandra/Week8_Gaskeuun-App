import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SIGN_UP($name: String!, $email: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password }) {
      code
      message
      token
      user {
        id
        name
        email
        password
        imageUrl
      }
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

export const CREATE_EVENT = gql`
  mutation CREATE_EVENT(
    $userId: Int!
    $categoryId: Int!
    $title: String!
    $host: String!
    $date: String!
    $location: String!
    $description: String!
    $imageUrl: String
  ) {
    createEvent(
      input: {
        userId: $userId
        categoryId: $categoryId
        title: $title
        host: $host
        date: $date
        location: $location
        description: $description
        imageUrl: $imageUrl
      }
    ) {
      code
      message
    }
  }
`;
