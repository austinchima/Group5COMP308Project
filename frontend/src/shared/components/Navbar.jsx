import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Community AI Platform
          </h2>
          <p className="text-sm text-slate-500">
            Manage your network, activities, and updates
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || 'User'}
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {user?.role?.replaceAll('_', ' ') || 'Member'}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar