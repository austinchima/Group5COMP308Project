import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client/react'
import { LOGIN_MUTATION } from '../graphql/authQueries'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'
import { useAuth } from '../../../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [serverError, setServerError] = useState('')

  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION)

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    try {
      const { data } = await loginMutation({
        variables: {
          email: form.email.trim(),
          password: form.password
        }
      })

      if (data?.login) {
        login({
          user: data.login.user,
          token: data.login.token
        })
        navigate('/dashboard')
      }
    } catch (err) {
      console.error('Login failed:', err)
      setServerError(err?.message || 'Login failed.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between p-12 text-white">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              Community AI Platform
            </div>
            <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight">
              Welcome back to your community dashboard.
            </h1>
            <p className="mt-5 max-w-lg text-base text-slate-300">
              Sign in to manage local businesses, events, community posts, alerts,
              and support requests from one place.
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-2xl font-bold">Posts</p>
              <p className="mt-1 text-sm text-slate-300">Community updates</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-2xl font-bold">Alerts</p>
              <p className="mt-1 text-sm text-slate-300">Important notices</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-2xl font-bold">Events</p>
              <p className="mt-1 text-sm text-slate-300">Local engagement</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg">
                C
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Login</h2>
              <p className="mt-2 text-slate-600">
                Enter your account details to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />

              {(error || serverError) && (
                <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                  {serverError || error.message}
                </p>
              )}

              <Button
                type="submit"
                className="mt-2 w-full rounded-xl py-3 text-base font-semibold shadow-md"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don’t have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage