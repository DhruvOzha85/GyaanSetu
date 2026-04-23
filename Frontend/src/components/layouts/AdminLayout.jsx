import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { usePageTracking } from "@/hooks/usePageTracking";

const items = [
  { to: "/admin", label: "Overview", icon: "dashboard", end: true },
  { to: "/admin/users", label: "Users", icon: "group" },
  { to: "/admin/courses", label: "Courses", icon: "menu_book" },
  { to: "/admin/analytics", label: "Analytics", icon: "insights" },
];

export function AdminLayout() {
  usePageTracking();
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const title = items.find((i) => (i.end ? pathname === i.to : pathname.startsWith(i.to)))?.label ?? "Admin";

  return (
    <div className="min-h-screen flex bg-surface-container-low">
      <aside
        className={cn(
          "h-screen sticky top-0 bg-surface-container-lowest transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64",
        )}
      >
        <div className="px-5 py-6 flex items-center justify-between">
          {!collapsed && (
            <Link to="/" className="text-xl font-black italic text-primary-container">GyaanSetu</Link>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
            className="w-9 h-9 grid place-items-center rounded-xl hover:bg-surface-container-low text-on-surface-variant"
          >
            <Icon name={collapsed ? "menu" : "menu_open"} />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors",
                  isActive
                    ? "bg-primary-fixed text-on-primary-fixed"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
                )
              }
            >
              <Icon name={item.icon} className="text-xl" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-outline-variant/30">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm text-on-surface-variant hover:bg-surface-container-low"
          >
            <Icon name="logout" className="text-xl" />
            {!collapsed && <span>Exit admin</span>}
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface-container-lowest px-6 flex items-center justify-between sticky top-0 z-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Admin Console</p>
            <h1 className="text-lg font-black text-on-surface">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-10 h-10 grid place-items-center rounded-xl bg-surface-container-low text-on-surface"
            >
              <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/30">
              <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="hidden md:block">
                <p className="text-sm font-bold text-on-surface leading-tight">{user?.name}</p>
                <button onClick={logout} className="text-xs text-error font-semibold">Sign out</button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
