import gql from 'graphql-tag'

const typeDefs = gql`
  enum Role {
    RESIDENT
    BUSINESS_OWNER
    COMMUNITY_ORGANIZER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    location: String
    interests: [String]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      role: Role!
      location: String
      interests: [String]
    ): AuthPayload

    login(email: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;