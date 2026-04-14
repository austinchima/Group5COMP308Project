import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Navbar />
          <main className="p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout