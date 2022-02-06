import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
    query{
        getEvents{
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

export const GET_EVENTS_PARAMS = gql`
    query($param: String!){
        getEventParam(param: $param){
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

export const GET_EVENT_BY_ID = gql`
    query($id: Int!){
        getEvent(eventId: $id){
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