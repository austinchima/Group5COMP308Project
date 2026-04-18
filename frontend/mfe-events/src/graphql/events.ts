import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      organizerId
      organizerName
      title
      description
      category
      date
      time
      location
      capacity
      volunteers {
        userId
        userName
      }
      suggestedBestTime
      createdAt
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $description: String!
    $category: String
    $date: String!
    $time: String
    $location: String
    $capacity: Int
  ) {
    createEvent(
      title: $title
      description: $description
      category: $category
      date: $date
      time: $time
      location: $location
      capacity: $capacity
    ) {
      id
      organizerId
      organizerName
      title
      description
      category
      date
      time
      location
      capacity
      volunteers {
        userId
        userName
      }
      suggestedBestTime
      createdAt
    }
  }
`;

export const UPDATE_EVENT_SUGGESTED_TIME = gql`
  mutation UpdateEventSuggestedTime(
    $eventId: ID!
    $suggestedBestTime: String!
  ) {
    updateEventSuggestedTime(
      eventId: $eventId
      suggestedBestTime: $suggestedBestTime
    ) {
      id
      suggestedBestTime
    }
  }
`;

export const ASSIGN_VOLUNTEER = gql`
  mutation AssignVolunteer(
    $eventId: ID!
    $userId: String!
    $userName: String!
  ) {
    assignVolunteer(
      eventId: $eventId
      userId: $userId
      userName: $userName
    ) {
      id
      volunteers {
        userId
        userName
      }
    }
  }
`;