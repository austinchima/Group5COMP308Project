import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const authClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5001/graphql'
  }),
  cache: new InMemoryCache()
})

export const communityClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5002/graphql'
  }),
  cache: new InMemoryCache()
})

export const businessEventsClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5003/graphql'
  }),
  cache: new InMemoryCache()
})

export const aiClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5004/graphql'
  }),
  cache: new InMemoryCache()
})