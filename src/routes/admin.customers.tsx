import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CUSTOMERS, formatTND } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({ meta: [{ title: "Customers — MOXMALL Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminCustomers,
});

const TIER: Record<string, string> = {
  VIP: "bg-ink text-canvas",
  Repeat: "bg-brand-soft text-brand",
  New: "bg-surface text-ink-muted border border-line",
};

function AdminCustomers() {
  return (
    <AdminShell
      eyebrow="Audience"
      title="Customers"
      description="Segment, understand, and grow the MOXMALL community."
    >
      <div className="rounded-2xl border border-line/70 bg-canvas overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-ink-muted font-mono text-[11px] uppercase tracking-wider bg-surface/60">
                <th className="px-5 py-3 font-normal">Customer</th>
                <th className="px-5 py-3 font-normal">City</th>
                <th className="px-5 py-3 font-normal text-right">Orders</th>
                <th className="px-5 py-3 font-normal text-right">Lifetime spend</th>
                <th className="px-5 py-3 font-normal">Tier</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.id} className="border-t border-line/60 hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-surface font-mono text-[11px] font-semibold">
                        {c.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-[11px] text-ink-muted">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">{c.city}</td>
                  <td className="px-5 py-3 text-right font-mono">{c.orders}</td>
                  <td className="px-5 py-3 text-right font-mono">{formatTND(c.spent)}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-mono ${TIER[c.tier]}`}>
                      {c.tier}
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
