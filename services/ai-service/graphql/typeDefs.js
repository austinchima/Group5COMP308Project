import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    healthCheck: String
  }

  type Mutation {
    summarizeDiscussion(text: String!): String
    classifyReviewSentiment(text: String!): String
    predictBestEventTime(title: String!, description: String!, location: String): String
    suggestVolunteerMatches(description: String!, skills: [String]): String
  }
`;

export default typeDefs;