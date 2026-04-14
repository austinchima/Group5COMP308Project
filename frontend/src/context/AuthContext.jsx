import { createContext, useContext, useEffect, useState } from 'react'
import { storage } from '../shared/utils/storage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.getUser())
  const [token, setToken] = useState(storage.getToken())
  const [isAuthenticated, setIsAuthenticated] = useState(!!storage.getToken())

  useEffect(() => {
    setIsAuthenticated(!!token)
  }, [token])

  const login = ({ user, token }) => {
    storage.setUser(user)
    storage.setToken(token)
    setUser(user)
    setToken(token)
  }

  const logout = () => {
    storage.clearAuth()
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}