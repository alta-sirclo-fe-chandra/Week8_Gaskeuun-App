import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query {
    getEvents {
      id
      userId
      categoryId
      title
      host
      date
      description
      location
    }
  }
`;

export const GET_EVENTS_PARAMS = gql`
  query ($param: String!) {
    getEventParam(param: $param) {
      id
      userId
      categoryId
      title
      host
      date
      description
      location
    }
  }
`;

export const GET_MY_EVENT = gql`
  query{
    getMyEvent{
        userId
        categoryId
        title
        host
        date
        location
        description
        imageUrl
    }
  }
`

export const GET_EVENT_BY_ID = gql`
  query ($id: Int!) {
    getEvent(eventId: $id) {
      id
      userId
      categoryId
      title
      host
      date
      description
      location
    }
  }
`

export const GET_JOINED_EVENTS = gql`
  query{
    getEventJoinedByUser{
        userId
        categoryId
        title
        host
        date
        location
        description
        imageUrl
    }
  }
`

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

export const GET_USER = gql`
  query GET_USER($userId: Int!) {
    getUser(userId: $userId) {
      id
      name
      email
      imageUrl
    }
  }
`

export const GET_PARTICIPANTS = gql`
  query($eventId: Int!) {
    getParticipants(eventId: $eventId) {
        participants {
            id
            name
            email 
            imageUrl
        }
        totalPage
    }
  }
` 
