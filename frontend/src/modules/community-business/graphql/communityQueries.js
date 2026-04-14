import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      author
      createdAt
    }
  }
`

export const GET_HELP_REQUESTS = gql`
  query GetHelpRequests {
    helpRequests {
      id
      title
      description
      status
      requester
    }
  }
`

export const GET_ALERTS = gql`
  query GetAlerts {
    alerts {
      id
      message
      severity
      createdAt
    }
  }
`