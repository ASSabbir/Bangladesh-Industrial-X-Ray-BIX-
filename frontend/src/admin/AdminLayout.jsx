import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdDashboard, MdBuild, MdPhotoLibrary, MdWork, MdSchool,
} from "react-icons/md";
import { FiMenu, FiChevronLeft, FiLogOut } from "react-icons/fi";
import logo from "../assets/image/logo.png";

const LINKS = [
  { to: "/admin", label: "Dashboard", end: true, icon: MdDashboard, color: "text-sky-500" },
  { to: "/admin/services", label: "Services", icon: MdBuild, color: "text-emerald-500" },
  { to: "/admin/equipment", label: "Equipment", icon: MdWork, color: "text-amber-500" },
  { to: "/admin/gallery", label: "Gallery", icon: MdPhotoLibrary, color: "text-fuchsia-500" },
  { to: "/admin/projects", label: "Completed Projects", icon: MdWork, color: "text-rose-500" },
  { to: "/admin/training", label: "Training", icon: MdSchool, color: "text-indigo-500" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <aside className={`bg-primary text-white flex flex-col shrink-0 transition-all duration-200 ${collapsed ? "w-20" : "w-64"}`}>
        <div className="flex items-center gap-2 p-4 border-b border-white/10">
          <div className="bg-white rounded-md p-1.5 shrink-0">
            <img src={logo} alt="BIX" className="w-8" />
          </div>
          {!collapsed && <span className="font-semibold text-sm">Admin Panel</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              title={l.label}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "bg-accent text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <l.icon size={20} className={collapsed ? "text-white" : l.color} />
              {!collapsed && l.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-white/10 hover:text-white mb-2"
          >
            {collapsed ? <FiMenu size={16} /> : <FiChevronLeft size={16} />}
            {!collapsed && "Collapse"}
          </button>
          {!collapsed && <p className="text-xs text-white/50 px-3 mb-2 truncate">{admin?.email}</p>}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/80 hover:text-accent font-medium"
          >
            <FiLogOut size={16} />
            {!collapsed && "Log Out"}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-black/5 h-16 flex items-center px-8 justify-between shrink-0">
          <p className="text-sm text-textmuted">
            Signed in as <strong className="text-primary">{admin?.name}</strong>
          </p>
          <a href="/" target="_blank" rel="noreferrer" className="text-sm text-accent font-semibold hover:underline">
            View Live Site ↗
          </a>
        </header>
        <main className="flex-1 p-8 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}