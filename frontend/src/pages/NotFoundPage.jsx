import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 text-center">
      <h1 className="mb-2 text-5xl font-bold text-slate-900">404</h1>
      <p className="mb-4 text-slate-600">Page not found.</p>
      <Link
        to="/dashboard"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage