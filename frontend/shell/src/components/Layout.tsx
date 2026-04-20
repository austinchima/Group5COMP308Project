import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuthUser, getNavForRole } from "../hooks/useAuth.ts";
import type { UserRole } from "../hooks/useAuth.ts";
import NotificationTray from "./NotificationTray.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const user = getAuthUser();
  const role: UserRole = user?.role ?? "Resident";
  const navItems = getNavForRole(role);

  const isFabVisible = React.useMemo(() => {
    if (location.pathname === "/feed") return true;
    if (location.pathname === "/help") return true;
    if (location.pathname === "/events" && (role === "Resident" || role === "Community Organizer")) return true;
    if (location.pathname === "/business" && role === "Business Owner") return true;
    return false;
  }, [location.pathname, role]);

  const handleFabClick = () => {
    const event = new CustomEvent("commons-fab-click", { detail: { pathname: location.pathname } });
    window.dispatchEvent(event);
  };

  return (
    <div className="font-body selection:bg-primary-fixed selection:text-on-primary-container min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 bg-[#eaffea]/80 backdrop-blur-xl flex items-center justify-between px-6 py-3 w-full shadow-sm shadow-emerald-900/5">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-extrabold tracking-tight text-emerald-900 font-headline">
            The Commons
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface-container-highest flex items-center px-4 py-2 rounded-sm gap-2">
            <span className="material-symbols-outlined text-on-surface-variant">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-48 outline-none"
              placeholder="Search..."
              type="text"
            />
          </div>
          <NotificationTray />
          <Link to="/profile">
            <img
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-primary-container cursor-pointer hover:brightness-95 transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoLpXh3J9rjhr3RMmjlqDe8srj1C-8eb-DLYNhSTjrqj9iocSpFeqvrHhKisbIUEwcpXg5rQnCnDbA69sGZfwnuYBsmZrecUGiyBQq734xgP8W9bxS86jVrDRzNU4p2sH_-m84GGOTOGg7ir1wml12-sheF9nXgVZlY923CzpgShnAP2ZVFtHdY4hVeUBuyRmJqaVdSqnDOufADJSFCEPT75YFDHNDhfIPruge-6DrZEVp-1gkrqfoq-MocHUfzXY5tIlrCJGKvI"
            />
          </Link>
        </div>
      </nav>

      {/* Side Navigation (Web Only) — driven by role */}
      <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 pt-20 bg-surface-container-low flex-col gap-2 pr-4 z-40 transition-all">
        <div className="px-6 mb-4 mt-4">
          <h2 className="font-headline font-black text-emerald-900 text-xl">
            The Commons
          </h2>
          <p className="text-xs text-emerald-800/60 font-body">
            Vibrant &amp; Organized
          </p>
        </div>

        {/* Role badge */}
        <div className="px-6 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-container/40 text-emerald-900 text-[11px] font-bold rounded-full">
            <span className="material-symbols-outlined text-sm">badge</span>
            {role}
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-4 px-6 py-3 transition-all ${location.pathname === item.to ? "bg-white text-emerald-900 rounded-r-full shadow-sm font-bold" : "text-emerald-800/60 hover:translate-x-1"}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2 pt-4 border-t border-emerald-900/10">
            <a
              className="flex items-center gap-4 text-emerald-800/60 text-sm hover:text-emerald-900 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </a>
            <a
              className="flex items-center gap-4 text-emerald-800/60 text-sm hover:text-emerald-900 transition-all"
              href="#"
            >
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

      {/* Mobile Bottom NavBar — driven by role */}
      <nav className="hidden max-md:flex fixed bottom-0 left-0 right-0 bg-[#eaffea]/80 backdrop-blur-xl items-center justify-around py-4 z-50">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center gap-1 ${location.pathname === item.to ? "text-emerald-900" : "text-emerald-800/60"}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Floating Action Button */}
      {isFabVisible && (
        <button 
          onClick={handleFabClick}
          className="hidden max-md:flex fixed bottom-24 right-6 bg-linear-to-br from-primary-dim to-primary text-on-primary w-14 h-14 rounded-full shadow-2xl items-center justify-center active:scale-95 transition-all z-40"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}
    </div>
  );
}
