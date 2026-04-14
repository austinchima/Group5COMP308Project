import { ApolloProvider } from '@apollo/client/react'
import { authClient } from './clients'

export function ApolloProviders({ children }) {
  return <ApolloProvider client={authClient}>{children}</ApolloProvider>
}