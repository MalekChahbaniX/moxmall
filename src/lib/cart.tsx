import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartLine = { productId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  detailed: (CartLine & { product: Product })[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "moxmall.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = lines
      .map((l) => {
        const product = PRODUCTS.find((p) => p.id === l.productId);
        return product ? { ...l, product } : null;
      })
      .filter((v): v is CartLine & { product: Product } => v !== null);

    return {
      lines,
      open,
      setOpen,
      detailed,
      count: detailed.reduce((n, l) => n + l.quantity, 0),
      subtotal: detailed.reduce((n, l) => n + l.quantity * l.product.price, 0),
      add: (id, qty = 1) => {
        setLines((prev) => {
          const existing = prev.find((l) => l.productId === id);
          if (existing)
            return prev.map((l) =>
              l.productId === id ? { ...l, quantity: l.quantity + qty } : l,
            );
          return [...prev, { productId: id, quantity: qty }];
        });
        setOpen(true);
      },
      remove: (id) => setLines((prev) => prev.filter((l) => l.productId !== id)),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.productId !== id)
            : prev.map((l) => (l.productId === id ? { ...l, quantity: qty } : l)),
        ),
      clear: () => setLines([]),
    };
  }, [lines, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}