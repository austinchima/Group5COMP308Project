import { ApolloProviders } from './apollo/ApolloProviders'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <ApolloProviders>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ApolloProviders>
  )
}

export default App