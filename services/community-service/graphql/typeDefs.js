import gql from 'graphql-tag';

const typeDefs = gql`
  type Comment {
    id: ID!
    userId: String!
    userName: String!
    text: String!
    createdAt: String
  }

  type Post {
    id: ID!
    authorId: String!
    authorName: String!
    title: String!
    content: String!
    summary: String
    comments: [Comment]
    tags: [String]
    createdAt: String
  }

  type MatchedVolunteer {
    userId: String
    userName: String
  }

  type HelpRequest {
    id: ID!
    requesterId: String!
    requesterName: String!
    title: String!
    description: String!
    neededSkills: [String]
    location: String
    matchedVolunteers: [MatchedVolunteer]
    status: String
    createdAt: String
  }

  type EmergencyAlert {
    id: ID!
    reporterId: String!
    reporterName: String!
    title: String!
    description: String!
    severity: String!
    location: String
    isActive: Boolean
    createdAt: String
  }

  type Query {
    posts: [Post]
    helpRequests: [HelpRequest]
    emergencyAlerts: [EmergencyAlert]
  }

  type Mutation {
    createPost(title: String!, content: String!, tags: [String]): Post
    editPost(postId: ID!, title: String!, content: String!): Post
    updatePostSummary(postId: ID!, summary: String!): Post
    addComment(postId: ID!, text: String!): Post

    createHelpRequest(title: String!, description: String!, neededSkills: [String], location: String): HelpRequest
    updateMatchedVolunteers(helpRequestId: ID!, volunteers: [VolunteerInput!]!): HelpRequest

    createEmergencyAlert(title: String!, description: String!, severity: String!, location: String): EmergencyAlert
  }

  input VolunteerInput {
    userId: String!
    userName: String!
  }
`;

export default typeDefs;