import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query($page: Int!){
    getEvents(page: $page){
        event{
            id
            userId
            categoryId
            title
            host
            date
            location
            imageUrl
        }
        totalPage
    }
  }
`;

export const GET_EVENTS_PARAMS = gql`
  query ($param: String!, $page: Int!) {
    getEventParam(param: $param, page: $page) {
      event{
        id
        userId
        categoryId
        title
        host
        date
        description
        location
        imageUrl
      }
      totalPage
    }
  }
`;

export const GET_MY_EVENT = gql`
  query($page: Int!){
    getMyEvent(page: $page){
      event{
        id
        userId
        categoryId
        title
        host
        date
        location
        imageUrl
    }
    totalPage
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
      imageUrl
      participants{
        id
        name
        email
        imageUrl
      }
      Comments{
          id
          comment
          user{
              id
              name
              email
              imageUrl
          }
          updatedAt
      }
    }
  }
`

export const GET_JOINED_EVENTS = gql`
  query($page: Int!){
    getEventJoinedByUser(page: $page){
      event{
        id
        userId
        categoryId
        title
        host
        date
        location
        imageUrl
      }
      totalPage
    }
  }
`

export const GET_PARTICIPANT_STATUS = gql`
  query($eventId: Int!) {
    getParticipantStatus(eventId: $eventId) {
        status
    }
  }
`

export const GET_COMMENTS = gql`
query($eventId: Int!, $limit: Int!) {
  getComments(eventId: $eventId, limit: $limit) {
      comments {
          id
          user {
              id
              name
              email 
              imageUrl
          }
          comment
      }
      totalPage
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
