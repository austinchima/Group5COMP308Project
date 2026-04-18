import gql from 'graphql-tag';

const typeDefs = gql`
  type Business {
    id: ID!
    ownerId: String!
    ownerName: String!
    name: String!
    description: String!
    category: String
    location: String
    imageUrl: String
    deals: [String]
    createdAt: String
  }

  type Review {
    id: ID!
    businessId: String!
    userId: String!
    userName: String!
    rating: Int!
    comment: String!
    sentiment: String
    response: String
    createdAt: String
  }

  type Volunteer {
    userId: String!
    userName: String!
  }

  type Event {
    id: ID!
    organizerId: String!
    organizerName: String!
    title: String!
    description: String!
    category: String
    date: String!
    time: String
    location: String
    capacity: Int
    volunteers: [Volunteer]
    suggestedBestTime: String
    createdAt: String
  }

  type Query {
    businesses: [Business]
    reviews(businessId: ID!): [Review]
    events: [Event]
  }

  type Mutation {
    createBusiness(
      name: String!
      description: String!
      category: String
      location: String
      imageUrl: String
      deals: [String]
    ): Business

    addReview(
      businessId: ID!
      rating: Int!
      comment: String!
    ): Review

    updateReviewSentiment(
      reviewId: ID!
      sentiment: String!
    ): Review

    respondToReview(
      reviewId: ID!
      response: String!
    ): Review

    createEvent(
      title: String!
      description: String!
      category: String
      date: String!
      time: String
      location: String
      capacity: Int
    ): Event

    updateEventSuggestedTime(
      eventId: ID!
      suggestedBestTime: String!
    ): Event

    assignVolunteer(
      eventId: ID!
      userId: String!
      userName: String!
    ): Event
  }
`;

export default typeDefs;