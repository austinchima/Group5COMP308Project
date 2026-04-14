import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client/react'
import { REGISTER_MUTATION } from '../graphql/authQueries'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'

function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'RESIDENT'
  })

  const [serverError, setServerError] = useState('')

  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION)

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
      const { data } = await registerMutation({
        variables: {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role,
          location: '',
          interests: []
        }
      })

      console.log('Register response:', data)
      navigate('/login')
    } catch (err) {
      console.error('Registration failed:', err)
      setServerError(err?.message || 'Registration failed.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between p-12 text-white">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              Join the Platform
            </div>
            <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight">
              Create an account and start building local impact.
            </h1>
            <p className="mt-5 max-w-lg text-base text-slate-300">
              Register as a resident, business owner, or community organizer and
              access the tools designed for your role.
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-1 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-lg font-semibold">Residents</p>
              <p className="mt-1 text-sm text-slate-300">
                Post updates, find help, and stay informed.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-lg font-semibold">Business Owners</p>
              <p className="mt-1 text-sm text-slate-300">
                Promote services and connect with the community.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-lg font-semibold">Organizers</p>
              <p className="mt-1 text-sm text-slate-300">
                Manage events, outreach, and community engagement.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg">
                R
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Register</h2>
              <p className="mt-2 text-slate-600">
                Set up your account to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

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
                placeholder="Create a password"
              />

              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500"
                >
                  <option value="RESIDENT">Resident</option>
                  <option value="BUSINESS_OWNER">Business Owner</option>
                  <option value="COMMUNITY_ORGANIZER">Community Organizer</option>
                </select>
              </div>

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
                {loading ? 'Creating account...' : 'Register'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage