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

export const EDIT_EVENT = gql`
  mutation(
    $eventId: Int!
    $categoryId: Int!
    $title: String!
    $host: String!
    $date: String!
    $location: String!
    $description: String!
    $imageUrl: String!
  ){
    updateEvent(eventId: $eventId, edit:{
        categoryId: $categoryId
        title: $title
        host: $host
        date: $date
        location: $location
        description: $description
        imageUrl: $imageUrl
    })
    {
    code
    message
    }
  }
`

export const DELETE_EVENT = gql`
  mutation($eventId: Int!){
    deleteEvent(eventId: $eventId)
    {
    code
    message
    }
  }
`
