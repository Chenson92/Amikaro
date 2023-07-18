import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      events {
        _id
        title
        image
        eventText
        createdAt
        creator
      }
    }
  }
`;

export const QUERY_EVENTS_FOR_LOCATION = gql`
  query getEvents($locationId: String!) {
    location_events(locationId: $locationId) {
      _id
      title
      image
      eventText
      creator
      createdAt
    }
  }
`;
export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      title
      image
      creator
      eventText
      createdAt
    }
  }
`;

export const QUERY_SINGLE_EVENT = gql`
  query getSingleEvent($eventId: ID!) {
    event(eventId: $eventId) {
      _id
      title
      image
      eventText
      creator
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      events {
        _id
        title
        image
        eventText
        creator
        createdAt
      }
    }
  }
`;
