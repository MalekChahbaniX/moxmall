import type { ReactNode } from "react";
import { Bell, Search, Plus } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminShell({ title, eyebrow, description, actions, children }: Props) {
  return (
    <div className="min-h-screen bg-surface/60 text-ink">
      <AdminSidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 h-16 bg-canvas/85 backdrop-blur-xl border-b border-line/70">
          <div className="h-full px-6 flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-full bg-surface border border-line/80 text-[12px] text-ink-muted flex-1 max-w-md font-mono">
              <Search className="size-3.5" />
              <span>Search orders, products, customers…</span>
              <span className="ml-auto rounded border border-line px-1.5 text-[10px]">⌘K</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface transition-colors relative">
                <Bell className="size-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-brand" />
              </button>
              <button className="inline-flex items-center gap-2 h-9 px-3 rounded-full bg-ink text-canvas text-[12px] font-medium hover:opacity-90 transition-opacity">
                <Plus className="size-3.5" /> New product
              </button>
              <div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-brand text-canvas font-mono text-[11px] font-semibold">
                MX
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 lg:px-10 py-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-sm text-ink-muted max-w-2xl">{description}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
