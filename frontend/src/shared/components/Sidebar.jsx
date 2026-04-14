import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/posts', label: 'Posts', icon: '📝' },
  { to: '/help-requests', label: 'Help Requests', icon: '🤝' },
  { to: '/alerts', label: 'Alerts', icon: '🚨' },
  { to: '/businesses', label: 'Businesses', icon: '🏪' },
  { to: '/events', label: 'Events', icon: '📅' }
]

function Sidebar() {
  return (
    <aside className="min-h-screen w-72 border-r border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-5 py-6 text-white shadow-2xl">
      <div className="mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold shadow-lg">
          C
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">Navigation</h2>
        <p className="mt-1 text-sm text-slate-400">
          Community platform modules
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">System Status</p>
        <p className="mt-2 text-xs text-slate-400">
          Connected to community modules and services.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar