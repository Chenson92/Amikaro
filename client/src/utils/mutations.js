import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($eventText: String!) {
    addEvent(eventText: $eventText) {
      _id
      title
      eventText
      creator
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($eventId: ID!, $commentText: String!) {
    addComment(eventId: $eventId, commentText: $commentText) {
      _id
      title
      eventText
      creator
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
