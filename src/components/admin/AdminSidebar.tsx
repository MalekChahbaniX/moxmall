import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Megaphone,
  Settings,
  Store,
  LogOut,
} from "lucide-react";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package, exact: false },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag, exact: false },
  { to: "/admin/customers", label: "Customers", icon: Users, exact: false },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3, exact: false },
  { to: "/admin/marketing", label: "Marketing", icon: Megaphone, exact: false },
  { to: "/admin/settings", label: "Settings", icon: Settings, exact: false },
] as const;

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-line/70 bg-canvas">
      <div className="h-16 flex items-center px-6 border-b border-line/70">
        <Link to="/" className="font-display text-base font-extrabold tracking-tighter uppercase text-ink">
          Moxmall
          <span className="ml-2 font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <p className="eyebrow px-3 pt-3 pb-2">Workspace</p>
        <ul className="space-y-0.5">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={`group flex items-center gap-3 rounded-lg px-3 h-9 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-ink text-canvas"
                      : "text-ink-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  <n.icon className="size-4" />
                  <span>{n.label}</span>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-line/70 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 h-9 text-[13px] font-medium text-ink-muted hover:bg-surface hover:text-ink transition-colors"
        >
          <Store className="size-4" />
          View storefront
        </Link>
        <button className="w-full flex items-center gap-3 rounded-lg px-3 h-9 text-[13px] font-medium text-ink-muted hover:bg-surface hover:text-ink transition-colors">
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
