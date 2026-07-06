import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDownRight, TrendingUp, ShoppingBag, Users, Zap, ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdminShell } from "@/components/admin/AdminShell";
import { KPIS, ORDERS, REVENUE_SERIES, ADMIN_PRODUCTS, formatTND } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Overview — MOXMALL Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminOverview,
});

const KPI_CARDS = [
  { key: "revenue", label: "Revenue", value: formatTND(KPIS.revenue), delta: KPIS.revenueDelta, icon: TrendingUp, hint: "vs. last 7 days" },
  { key: "orders", label: "Orders", value: KPIS.orders.toString(), delta: KPIS.ordersDelta, icon: ShoppingBag, hint: "136 fulfilled" },
  { key: "customers", label: "New customers", value: KPIS.customers.toString(), delta: KPIS.customersDelta, icon: Users, hint: "92 this week" },
  { key: "conv", label: "Conversion", value: `${KPIS.conversion}%`, delta: KPIS.conversionDelta, icon: Zap, hint: "Session to order" },
];

const STATUS_TONE: Record<string, string> = {
  paid: "bg-brand-soft text-brand",
  processing: "bg-surface text-ink border border-line",
  shipped: "bg-ink text-canvas",
  pending: "bg-surface text-ink-muted border border-line",
  refunded: "bg-surface text-ink-muted border border-line line-through",
};

function AdminOverview() {
  return (
    <AdminShell
      eyebrow="Dashboard"
      title="Welcome back, Mox."
      description="Here's how MOXMALL is performing this week — real-time revenue, orders, and inventory health."
      actions={
        <>
          <button className="h-9 px-4 rounded-full border border-line/80 bg-canvas text-[12px] font-medium hover:bg-surface transition-colors">
            Last 7 days
          </button>
          <button className="h-9 px-4 rounded-full bg-ink text-canvas text-[12px] font-medium hover:opacity-90 transition-opacity">
            Export report
          </button>
        </>
      }
    >
      {/* KPI grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_CARDS.map((k) => {
          const positive = k.delta >= 0;
          return (
            <div
              key={k.key}
              className="rounded-2xl border border-line/70 bg-canvas p-5 shadow-[0_1px_2px_rgba(17,17,17,0.03)] hover:shadow-[0_10px_40px_-12px_rgba(17,17,17,0.12)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow">{k.label}</p>
                <div className="grid h-8 w-8 place-items-center rounded-full bg-surface">
                  <k.icon className="size-3.5" />
                </div>
              </div>
              <p className="mt-4 font-display text-3xl font-extrabold tracking-tight">{k.value}</p>
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-mono ${
                    positive ? "bg-brand-soft text-brand" : "bg-surface text-ink-muted border border-line"
                  }`}
                >
                  {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {positive ? "+" : ""}
                  {k.delta}%
                </span>
                <span className="text-[11px] text-ink-muted">{k.hint}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Charts */}
      <section className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl border border-line/70 bg-canvas p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="eyebrow">Revenue</p>
              <p className="mt-1 font-display text-xl font-bold">{formatTND(44380)}</p>
            </div>
            <div className="flex gap-1 text-[11px] font-mono">
              {["7D", "30D", "90D", "YTD"].map((t, i) => (
                <button
                  key={t}
                  className={`h-7 px-2.5 rounded-full ${
                    i === 0 ? "bg-ink text-canvas" : "text-ink-muted hover:bg-surface"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_SERIES} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid var(--line)", fontSize: 12 }}
                  formatter={(v: number) => formatTND(v)}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--brand)" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-line/70 bg-canvas p-6">
          <p className="eyebrow">Orders by day</p>
          <p className="mt-1 font-display text-xl font-bold">136</p>
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_SERIES} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--line)", fontSize: 12 }} />
                <Bar dataKey="orders" fill="var(--ink)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Recent orders + top products */}
      <section className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl border border-line/70 bg-canvas overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-line/70">
            <div>
              <p className="eyebrow">Recent orders</p>
              <p className="mt-1 font-display text-lg font-bold">Latest 8</p>
            </div>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-ink hover:text-brand transition-colors"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-ink-muted font-mono text-[11px] uppercase tracking-wider">
                  <th className="px-5 py-3 font-normal">Order</th>
                  <th className="px-5 py-3 font-normal">Customer</th>
                  <th className="px-5 py-3 font-normal">Status</th>
                  <th className="px-5 py-3 font-normal text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className="border-t border-line/60 hover:bg-surface/60 transition-colors">
                    <td className="px-5 py-3 font-mono text-[12px]">{o.id}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium">{o.customer}</div>
                      <div className="text-[11px] text-ink-muted">{o.city}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-mono capitalize ${STATUS_TONE[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono">{formatTND(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-line/70 bg-canvas p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Top products</p>
              <p className="mt-1 font-display text-lg font-bold">This week</p>
            </div>
            <Link to="/admin/products" className="text-[12px] text-ink hover:text-brand">View</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {ADMIN_PRODUCTS.slice(0, 5).map((p, i) => (
              <li key={p.id} className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-ink-muted w-4">{i + 1}</span>
                <img src={p.image} alt={p.name} className="h-11 w-11 rounded-lg object-cover border border-line/60" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium truncate">{p.name}</p>
                  <p className="text-[11px] text-ink-muted">{p.sold} sold · {formatTND(p.price)}</p>
                </div>
                <div className="w-16 h-1.5 rounded-full bg-surface overflow-hidden">
                  <div
                    className="h-full bg-ink"
                    style={{ width: `${Math.min(100, p.sold * 2)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AdminShell>
  );
}
