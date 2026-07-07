import { useEffect, useRef, useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  adminProductsStore,
  CATEGORY_OPTIONS,
  BADGE_OPTIONS,
  slugify,
  type AdminProduct,
  type ProductInput,
} from "@/lib/admin-products-store";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: AdminProduct | null;
};

type FormState = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  compareAt: string;
  stock: string;
  category: AdminProduct["category"];
  categoryLabel: string;
  sku: string;
  image: string;
  badge: (typeof BADGE_OPTIONS)[number];
  colors: string[];
  sizes: string[];
  specs: { label: string; value: string }[];
};

const empty: FormState = {
  id: "",
  name: "",
  tagline: "",
  description: "",
  price: "",
  compareAt: "",
  stock: "0",
  category: "objects",
  categoryLabel: "Objects",
  sku: "",
  image: "",
  badge: "none",
  colors: [],
  sizes: [],
  specs: [],
};

function toForm(p: AdminProduct): FormState {
  return {
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    price: String(p.price),
    compareAt: p.compareAt ? String(p.compareAt) : "",
    stock: String(p.stock),
    category: p.category,
    categoryLabel: p.categoryLabel,
    sku: p.sku,
    image: p.image,
    badge: (p.badge ?? "none") as FormState["badge"],
    colors: [...p.colors],
    sizes: p.sizes ? [...p.sizes] : [],
    specs: p.specs.map((s) => ({ ...s })),
  };
}

export function ProductFormDialog({ open, onOpenChange, product }: Props) {
  const [f, setF] = useState<FormState>(empty);
  const [colorDraft, setColorDraft] = useState("");
  const [sizeDraft, setSizeDraft] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setF(product ? toForm(product) : empty);
      setColorDraft("");
      setSizeDraft("");
    }
  }, [open, product]);

  const isEdit = !!product;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setF((prev) => ({ ...prev, [key]: value }));
  }

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => set("image", String(reader.result));
    reader.readAsDataURL(file);
  }

  function addColor() {
    const v = colorDraft.trim();
    if (!v) return;
    set("colors", [...f.colors, v]);
    setColorDraft("");
  }
  function addSize() {
    const v = sizeDraft.trim().toUpperCase();
    if (!v) return;
    set("sizes", [...f.sizes, v]);
    setSizeDraft("");
  }
  function updateSpec(i: number, key: "label" | "value", v: string) {
    set(
      "specs",
      f.specs.map((s, idx) => (idx === i ? { ...s, [key]: v } : s)),
    );
  }

  function save() {
    if (!f.name.trim() || !f.image || !f.price) return;
    const catLabel =
      CATEGORY_OPTIONS.find((c) => c.value === f.category)?.label ?? f.categoryLabel;
    const payload: ProductInput = {
      id: isEdit ? f.id : slugify(f.name) || `p-${Date.now()}`,
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      description: f.description.trim(),
      price: Number(f.price) || 0,
      compareAt: f.compareAt ? Number(f.compareAt) : undefined,
      stock: Number(f.stock) || 0,
      category: f.category,
      categoryLabel: catLabel,
      sku: f.sku.trim() || `MX-${f.category.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      image: f.image,
      badge: f.badge === "none" ? undefined : (f.badge as AdminProduct["badge"]),
      colors: f.colors,
      sizes: f.sizes.length ? f.sizes : undefined,
      specs: f.specs.filter((s) => s.label.trim() || s.value.trim()),
    };
    if (isEdit) adminProductsStore.update(f.id, payload);
    else adminProductsStore.create(payload);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit product" : "New product"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update catalog details, variants, and inventory." : "Add a new product to your catalog."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          {/* Image */}
          <div>
            <Label className="text-xs uppercase tracking-wider text-ink-muted">Image</Label>
            <div className="mt-2 flex items-start gap-4">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-line/70 bg-surface">
                {f.image ? (
                  <img src={f.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-[11px] text-ink-muted">No image</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                  <Upload className="size-3.5 mr-1.5" /> Upload image
                </Button>
                <Input
                  placeholder="Or paste image URL"
                  value={f.image.startsWith("data:") ? "" : f.image}
                  onChange={(e) => set("image", e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Sonic One Modular" />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input value={f.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Reference over-ear headphones" />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>Price (TND)</Label>
              <Input type="number" value={f.price} onChange={(e) => set("price", e.target.value)} />
            </div>
            <div>
              <Label>Compare at</Label>
              <Input type="number" value={f.compareAt} onChange={(e) => set("compareAt", e.target.value)} placeholder="Optional" />
            </div>
            <div>
              <Label>Stock</Label>
              <Input type="number" value={f.stock} onChange={(e) => set("stock", e.target.value)} />
            </div>
            <div>
              <Label>SKU</Label>
              <Input value={f.sku} onChange={(e) => set("sku", e.target.value)} placeholder="Auto" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={f.category} onValueChange={(v) => set("category", v as AdminProduct["category"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Badge</Label>
              <Select value={f.badge} onValueChange={(v) => set("badge", v as FormState["badge"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BADGE_OPTIONS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Colors */}
          <div>
            <Label>Color variants</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {f.colors.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[12px]">
                  {c}
                  <button
                    type="button"
                    onClick={() => set("colors", f.colors.filter((_, idx) => idx !== i))}
                    className="text-ink-muted hover:text-ink"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                value={colorDraft}
                onChange={(e) => setColorDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                placeholder="e.g. Matte Obsidian"
              />
              <Button type="button" variant="outline" onClick={addColor}>
                <Plus className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <Label>Size variants</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {f.sizes.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[12px] font-mono">
                  {s}
                  <button
                    type="button"
                    onClick={() => set("sizes", f.sizes.filter((_, idx) => idx !== i))}
                    className="text-ink-muted hover:text-ink"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                value={sizeDraft}
                onChange={(e) => setSizeDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
                placeholder="e.g. M"
              />
              <Button type="button" variant="outline" onClick={addSize}>
                <Plus className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Specs */}
          <div>
            <div className="flex items-center justify-between">
              <Label>Specifications</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => set("specs", [...f.specs, { label: "", value: "" }])}
              >
                <Plus className="size-3.5 mr-1" /> Add spec
              </Button>
            </div>
            <div className="mt-2 grid gap-2">
              {f.specs.map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <Input value={s.label} onChange={(e) => updateSpec(i, "label", e.target.value)} placeholder="Label" />
                  <Input value={s.value} onChange={(e) => updateSpec(i, "value", e.target.value)} placeholder="Value" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => set("specs", f.specs.filter((_, idx) => idx !== i))}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
              {f.specs.length === 0 && (
                <p className="text-[11px] text-ink-muted">No specifications yet.</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save} disabled={!f.name.trim() || !f.image || !f.price}>
            {isEdit ? "Save changes" : "Create product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
