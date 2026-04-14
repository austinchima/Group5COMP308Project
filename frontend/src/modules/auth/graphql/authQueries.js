import { gql } from '@apollo/client'

export const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $role: Role!
    $location: String
    $interests: [String]
  ) {
    register(
      name: $name
      email: $email
      password: $password
      role: $role
      location: $location
      interests: $interests
    ) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
        location
        interests
      }
    }
  }
`