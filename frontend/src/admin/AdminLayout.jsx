import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/equipment", label: "Equipment" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/projects", label: "Previous Projects" },
  { to: "/admin/training", label: "Training" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-primary text-white flex flex-col shrink-0">
        <div className="flex items-center gap-2 p-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs border-2 border-accent">
            BIX
          </div>
          <span className="font-semibold text-sm">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "bg-accent text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 mb-2">{admin?.email}</p>
          <button onClick={logout} className="text-sm text-white/80 hover:text-accent font-medium">
            Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-black/5 h-16 flex items-center px-8 justify-between">
          <p className="text-sm text-textmuted">Signed in as <strong className="text-primary">{admin?.name}</strong></p>
          <a href="/" target="_blank" rel="noreferrer" className="text-sm text-accent font-semibold hover:underline">
            View Live Site ↗
          </a>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
