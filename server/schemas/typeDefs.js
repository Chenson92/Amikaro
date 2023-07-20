const { gql } = require("apollo-server-express");
//  add type Checkout { session: ID}
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    addEvents: [Event]
  }

  type Event {
    _id: ID
    title: String
    eventText: String
    image: String
    createdAt: String
    creator: String
  }
  type Booking {
    _id: ID!
    event: Event
    user: User
    createdAt: String
    updatedAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    location_events(locationId: String): [Event]
    events(username: String): [Event]
    event(eventId: ID!): Event
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEvent(title: String!, image: String!, eventText: String!): Event
    removeEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
