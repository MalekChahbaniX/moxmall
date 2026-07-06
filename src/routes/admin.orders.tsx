import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { ORDERS, formatTND } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders — MOXMALL Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminOrders,
});

const STATUS_TONE: Record<string, string> = {
  paid: "bg-brand-soft text-brand",
  processing: "bg-surface text-ink border border-line",
  shipped: "bg-ink text-canvas",
  pending: "bg-surface text-ink-muted border border-line",
  refunded: "bg-surface text-ink-muted border border-line",
};

const TABS = ["All", "Paid", "Processing", "Shipped", "Refunded"];

function AdminOrders() {
  return (
    <AdminShell
      eyebrow="Fulfillment"
      title="Orders"
      description="Track, fulfill and refund customer orders across every channel."
    >
      <div className="rounded-2xl border border-line/70 bg-canvas overflow-hidden">
        <div className="flex items-center gap-1 p-3 border-b border-line/70 overflow-x-auto">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`h-8 px-3 rounded-full text-[12px] font-medium ${
                i === 0 ? "bg-ink text-canvas" : "text-ink-muted hover:bg-surface"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-ink-muted font-mono text-[11px] uppercase tracking-wider bg-surface/60">
                <th className="px-5 py-3 font-normal">Order</th>
                <th className="px-5 py-3 font-normal">Placed</th>
                <th className="px-5 py-3 font-normal">Customer</th>
                <th className="px-5 py-3 font-normal">City</th>
                <th className="px-5 py-3 font-normal text-right">Items</th>
                <th className="px-5 py-3 font-normal text-right">Total</th>
                <th className="px-5 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id} className="border-t border-line/60 hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-[12px]">{o.id}</td>
                  <td className="px-5 py-3 text-ink-muted text-[12px]">
                    {new Date(o.placedAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="font-medium">{o.customer}</div>
                    <div className="text-[11px] text-ink-muted">{o.email}</div>
                  </td>
                  <td className="px-5 py-3">{o.city}</td>
                  <td className="px-5 py-3 text-right font-mono">{o.items}</td>
                  <td className="px-5 py-3 text-right font-mono">{formatTND(o.total)}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-mono capitalize ${STATUS_TONE[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
