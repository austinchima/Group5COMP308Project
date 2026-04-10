import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="font-body selection:bg-primary-fixed selection:text-on-primary-container min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 bg-[#eaffea]/80 backdrop-blur-xl flex items-center justify-between px-6 py-3 w-full shadow-sm shadow-emerald-900/5">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-extrabold tracking-tight text-emerald-900 font-headline">Editorial Harmony</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface-container-highest flex items-center px-4 py-2 rounded-sm gap-2">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-48 outline-none" placeholder="Search..." type="text" />
          </div>
          <button className="p-2 rounded-full hover:bg-emerald-100/50 transition-colors">
            <span className="material-symbols-outlined text-emerald-800">notifications</span>
          </button>
          <Link to="/profile">
            <img alt="User Profile" className="w-10 h-10 rounded-full border-2 border-primary-container cursor-pointer hover:brightness-95 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoLpXh3J9rjhr3RMmjlqDe8srj1C-8eb-DLYNhSTjrqj9iocSpFeqvrHhKisbIUEwcpXg5rQnCnDbA69sGZfwnuYBsmZrecUGiyBQq734xgP8W9bxS86jVrDRzNU4p2sH_-m84GGOTOGg7ir1wml12-sheF9nXgVZlY923CzpgShnAP2ZVFtHdY4hVeUBuyRmJqaVdSqnDOufADJSFCEPT75YFDHNDhfIPqruge-6DrZEVp-1gkrqfoq-MocHUfzXY5tIlrCJGKvI" />
          </Link>
        </div>
      </nav>

      {/* Side Navigation (Web Only) */}
      <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 pt-20 bg-[#dcfce0] flex-col gap-2 pr-4 z-40 transition-all">
        <div className="px-6 mb-8 mt-4">
          <h2 className="font-headline font-black text-emerald-900 text-xl">The Commons</h2>
          <p className="text-xs text-emerald-800/60 font-body">Vibrant & Organized</p>
        </div>
        <nav className="flex flex-col gap-1">
          <Link to="/feed" className={`flex items-center gap-4 px-6 py-3 transition-all ${location.pathname === '/feed' ? 'bg-white text-emerald-900 rounded-r-full shadow-sm font-bold' : 'text-emerald-800/60 hover:translate-x-1'}`}>
            <span className="material-symbols-outlined">dynamic_feed</span>
            <span>Feed</span>
          </Link>
          <Link to="/help" className={`flex items-center gap-4 px-6 py-3 transition-all ${location.pathname === '/help' ? 'bg-white text-emerald-900 rounded-r-full shadow-sm font-bold' : 'text-emerald-800/60 hover:translate-x-1'}`}>
            <span className="material-symbols-outlined">handshake</span>
            <span>Help</span>
          </Link>
          <Link to="/business" className={`flex items-center gap-4 px-6 py-3 transition-all ${location.pathname === '/business' ? 'bg-white text-emerald-900 rounded-r-full shadow-sm font-bold' : 'text-emerald-800/60 hover:translate-x-1'}`}>
            <span className="material-symbols-outlined">storefront</span>
            <span>Business</span>
          </Link>
          <Link to="/events" className={`flex items-center gap-4 px-6 py-3 transition-all ${location.pathname === '/events' ? 'bg-white text-emerald-900 rounded-r-full shadow-sm font-bold' : 'text-emerald-800/60 hover:translate-x-1'}`}>
            <span className="material-symbols-outlined">event</span>
            <span>Events</span>
          </Link>
          <Link to="/profile" className={`flex items-center gap-4 px-6 py-3 transition-all ${location.pathname === '/profile' ? 'bg-white text-emerald-900 rounded-r-full shadow-sm font-bold' : 'text-emerald-800/60 hover:translate-x-1'}`}>
            <span className="material-symbols-outlined">person</span>
            <span>Profile</span>
          </Link>
        </nav>
        <div className="mt-auto p-6 flex flex-col gap-4">
          <button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary py-3 px-4 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 duration-200">
            <span className="material-symbols-outlined">add</span>
            <span>New Post</span>
          </button>
          <div className="flex flex-col gap-2 pt-4 border-t border-emerald-900/10">
            <a className="flex items-center gap-4 text-emerald-800/60 text-sm hover:text-emerald-900 transition-all" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </a>
            <a className="flex items-center gap-4 text-emerald-800/60 text-sm hover:text-emerald-900 transition-all" href="#">
              <span className="material-symbols-outlined">help_outline</span>
              <span>Support</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 md:ml-64 transition-all">
        {children}
      </main>

      {/* Mobile Bottom NavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#eaffea]/80 backdrop-blur-xl flex items-center justify-around py-4 z-50">
        <Link to="/feed" className={`flex flex-col items-center gap-1 ${location.pathname === '/feed' ? 'text-emerald-900' : 'text-emerald-800/60'}`}>
          <span className="material-symbols-outlined">dynamic_feed</span>
          <span className="text-[10px] font-bold">Feed</span>
        </Link>
        <Link to="/help" className={`flex flex-col items-center gap-1 ${location.pathname === '/help' ? 'text-emerald-900' : 'text-emerald-800/60'}`}>
          <span className="material-symbols-outlined">handshake</span>
          <span className="text-[10px] font-bold">Help</span>
        </Link>
        <Link to="/events" className={`flex flex-col items-center gap-1 ${location.pathname === '/events' ? 'text-emerald-900' : 'text-emerald-800/60'}`}>
          <span className="material-symbols-outlined">event</span>
          <span className="text-[10px] font-bold">Events</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-emerald-900' : 'text-emerald-800/60'}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 bg-gradient-to-br from-primary-dim to-primary text-on-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}
