import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Download } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_PRODUCTS, formatTND } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/products")({
  head: () => ({ meta: [{ title: "Products — MOXMALL Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminProducts,
});

const STATUS: Record<string, string> = {
  active: "bg-brand-soft text-brand",
  low: "bg-surface text-ink border border-line",
  out: "bg-surface text-ink-muted border border-line line-through",
};

function AdminProducts() {
  return (
    <AdminShell
      eyebrow="Catalog"
      title="Products"
      description="Manage your catalog — inventory, pricing, variants, and merchandising."
      actions={
        <>
          <button className="h-9 px-4 rounded-full border border-line/80 bg-canvas text-[12px] font-medium hover:bg-surface transition-colors inline-flex items-center gap-2">
            <Download className="size-3.5" /> Export CSV
          </button>
          <button className="h-9 px-4 rounded-full bg-ink text-canvas text-[12px] font-medium hover:opacity-90">
            + New product
          </button>
        </>
      }
    >
      <div className="rounded-2xl border border-line/70 bg-canvas overflow-hidden">
        <div className="p-4 border-b border-line/70 flex flex-wrap gap-2 items-center">
          <div className="inline-flex items-center gap-2 h-9 px-3 rounded-full bg-surface border border-line/80 text-[12px] text-ink-muted font-mono flex-1 max-w-sm">
            <Search className="size-3.5" />
            <span>Search products…</span>
          </div>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-line/80 text-[12px] font-medium">
            <Filter className="size-3.5" /> All categories
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-line/80 text-[12px] font-medium">
            All status
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-ink-muted font-mono text-[11px] uppercase tracking-wider bg-surface/60">
                <th className="px-5 py-3 font-normal">Product</th>
                <th className="px-5 py-3 font-normal">SKU</th>
                <th className="px-5 py-3 font-normal">Category</th>
                <th className="px-5 py-3 font-normal text-right">Price</th>
                <th className="px-5 py-3 font-normal text-right">Stock</th>
                <th className="px-5 py-3 font-normal text-right">Sold</th>
                <th className="px-5 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_PRODUCTS.map((p) => (
                <tr key={p.id} className="border-t border-line/60 hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover border border-line/60" />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-[11px] text-ink-muted">{p.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-[12px] text-ink-muted">{p.sku}</td>
                  <td className="px-5 py-3">{p.categoryLabel}</td>
                  <td className="px-5 py-3 text-right font-mono">{formatTND(p.price)}</td>
                  <td className="px-5 py-3 text-right font-mono">{p.stock}</td>
                  <td className="px-5 py-3 text-right font-mono">{p.sold}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-mono capitalize ${STATUS[p.status]}`}>
                      {p.status}
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
