import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Download, Pencil, Trash2, RotateCcw } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductFormDialog } from "@/components/admin/ProductFormDialog";
import {
  adminProductsStore,
  useAdminProducts,
  CATEGORY_OPTIONS,
  type AdminProduct,
} from "@/lib/admin-products-store";
import { formatTND } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Products — MOXMALL Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProducts,
});

const STATUS: Record<string, string> = {
  active: "bg-brand-soft text-brand",
  low: "bg-surface text-ink border border-line",
  out: "bg-surface text-ink-muted border border-line line-through",
};

function AdminProducts() {
  const products = useAdminProducts();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (status !== "all" && p.status !== status) return false;
      if (q && !`${p.name} ${p.sku} ${p.tagline}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, query, cat, status]);

  function exportCsv() {
    const rows = [
      ["id", "name", "sku", "category", "price", "compareAt", "stock", "sold", "status", "colors", "sizes"],
      ...products.map((p) => [
        p.id,
        p.name,
        p.sku,
        p.categoryLabel,
        p.price,
        p.compareAt ?? "",
        p.stock,
        p.sold,
        p.status,
        p.colors.join("|"),
        (p.sizes ?? []).join("|"),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moxmall-products-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const toDelete = products.find((p) => p.id === deleteId) ?? null;

  return (
    <AdminShell
      eyebrow="Catalog"
      title="Products"
      description="Manage your catalog — inventory, pricing, variants, and merchandising."
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => adminProductsStore.reset()}
            className="rounded-full"
          >
            <RotateCcw className="size-3.5 mr-1.5" /> Reset
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} className="rounded-full">
            <Download className="size-3.5 mr-1.5" /> Export CSV
          </Button>
          <Button
            size="sm"
            onClick={() => setCreating(true)}
            className="rounded-full bg-ink text-canvas hover:opacity-90"
          >
            + New product
          </Button>
        </>
      }
    >
      <div className="rounded-2xl border border-line/70 bg-canvas overflow-hidden">
        <div className="p-4 border-b border-line/70 flex flex-wrap gap-2 items-center">
          <div className="inline-flex items-center gap-2 h-9 px-3 rounded-full bg-surface border border-line/80 text-[12px] flex-1 max-w-sm">
            <Search className="size-3.5 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="bg-transparent outline-none flex-1 font-mono text-[12px]"
            />
          </div>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="h-9 w-[180px] rounded-full text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORY_OPTIONS.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-[160px] rounded-full text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="low">Low stock</SelectItem>
              <SelectItem value="out">Out of stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-ink-muted font-mono text-[11px] uppercase tracking-wider bg-surface/60">
                <th className="px-5 py-3 font-normal">Product</th>
                <th className="px-5 py-3 font-normal">SKU</th>
                <th className="px-5 py-3 font-normal">Category</th>
                <th className="px-5 py-3 font-normal">Variants</th>
                <th className="px-5 py-3 font-normal text-right">Price</th>
                <th className="px-5 py-3 font-normal text-right">Stock</th>
                <th className="px-5 py-3 font-normal">Status</th>
                <th className="px-5 py-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-line/60 hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-10 w-10 rounded-lg object-cover border border-line/60"
                      />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-[11px] text-ink-muted">{p.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-[12px] text-ink-muted">{p.sku}</td>
                  <td className="px-5 py-3">{p.categoryLabel}</td>
                  <td className="px-5 py-3 text-[11px] text-ink-muted">
                    <div>{p.colors.length} color{p.colors.length === 1 ? "" : "s"}</div>
                    {p.sizes && p.sizes.length > 0 && <div>{p.sizes.length} size{p.sizes.length === 1 ? "" : "s"}</div>}
                  </td>
                  <td className="px-5 py-3 text-right font-mono">{formatTND(p.price)}</td>
                  <td className="px-5 py-3 text-right font-mono">{p.stock}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-mono capitalize ${STATUS[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditing(p)}
                        aria-label={`Edit ${p.name}`}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                        onClick={() => setDeleteId(p.id)}
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center text-sm text-ink-muted">
                    No products match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormDialog open={creating} onOpenChange={setCreating} product={null} />
      <ProductFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        product={editing}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              {toDelete ? `"${toDelete.name}" will be removed from your catalog.` : ""} This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) adminProductsStore.remove(deleteId);
                setDeleteId(null);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  );
}
