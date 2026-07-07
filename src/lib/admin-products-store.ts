import { useSyncExternalStore } from "react";
import { PRODUCTS, type Product } from "./products";

export type AdminProduct = Product & {
  sku: string;
  sold: number;
  status: "active" | "low" | "out";
};

const KEY = "moxmall.admin.products.v1";

function computeStatus(stock: number): AdminProduct["status"] {
  if (stock <= 0) return "out";
  if (stock <= 10) return "low";
  return "active";
}

function seed(): AdminProduct[] {
  return PRODUCTS.map((p, i) => ({
    ...p,
    sku: `MX-${p.category.slice(0, 3).toUpperCase()}-${(i + 1).toString().padStart(3, "0")}`,
    sold: 40 - i * 3 + (i % 2) * 12,
    status: computeStatus(p.stock),
  }));
}

let state: AdminProduct[] = seed();
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = JSON.parse(raw);
  } catch {
    /* ignore */
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  hydrate();
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

const EMPTY: AdminProduct[] = [];
function getSnapshot() {
  hydrate();
  return state;
}
function getServerSnapshot() {
  return EMPTY;
}

export function useAdminProducts() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export type ProductInput = Omit<AdminProduct, "status" | "sold"> & { sold?: number };

export const adminProductsStore = {
  create(input: ProductInput) {
    const p: AdminProduct = {
      ...input,
      sold: input.sold ?? 0,
      status: computeStatus(input.stock),
    };
    state = [p, ...state];
    emit();
  },
  update(id: string, input: ProductInput) {
    state = state.map((p) =>
      p.id === id
        ? { ...p, ...input, sold: input.sold ?? p.sold, status: computeStatus(input.stock) }
        : p,
    );
    emit();
  },
  remove(id: string) {
    state = state.filter((p) => p.id !== id);
    emit();
  },
  reset() {
    state = seed();
    emit();
  },
};

export const CATEGORY_OPTIONS: { value: Product["category"]; label: string }[] = [
  { value: "apparel", label: "Apparel" },
  { value: "audio", label: "Audio" },
  { value: "objects", label: "Objects" },
  { value: "workspace", label: "Workspace" },
  { value: "accessories", label: "Accessories" },
];

export const BADGE_OPTIONS = ["none", "new", "bestseller", "limited", "flash"] as const;

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}
