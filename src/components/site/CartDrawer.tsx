import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatTND } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, detailed, setQty, remove, subtotal, count } = useCart();

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-[440px] bg-canvas shadow-[var(--shadow-lift)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between px-6 py-5 border-b border-line">
            <div>
              <p className="eyebrow">Your bag</p>
              <p className="mt-1 font-display text-lg font-bold tracking-tight">
                {count} {count === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close cart"
              className="grid size-10 place-items-center rounded-full hover:bg-surface"
            >
              <X className="size-4" />
            </button>
          </header>

          {detailed.length === 0 ? (
            <div className="flex-1 grid place-items-center px-8 text-center">
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">Your bag is quiet.</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Discover pieces worth adding.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-ink text-canvas rounded-full text-[13px] font-medium hover:bg-brand transition-colors"
                >
                  Browse shop <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-line">
              {detailed.map((l) => (
                <div key={l.productId} className="flex gap-4 py-5">
                  <img
                    src={l.product.image}
                    alt=""
                    className="size-20 rounded-xl object-cover bg-surface"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-medium truncate">{l.product.name}</p>
                      <p className="text-sm font-mono">{formatTND(l.product.price * l.quantity)}</p>
                    </div>
                    <p className="text-xs text-ink-muted mt-0.5">{l.product.colors[0]}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-line rounded-full">
                        <button
                          onClick={() => setQty(l.productId, l.quantity - 1)}
                          className="grid size-8 place-items-center hover:bg-surface rounded-l-full"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono">{l.quantity}</span>
                        <button
                          onClick={() => setQty(l.productId, l.quantity + 1)}
                          className="grid size-8 place-items-center hover:bg-surface rounded-r-full"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(l.productId)}
                        className="text-[11px] font-mono uppercase tracking-widest text-ink-muted hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {detailed.length > 0 && (
            <footer className="border-t border-line px-6 py-5 space-y-4 bg-surface/60">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-2xl font-extrabold tracking-tight">
                  {formatTND(subtotal)}
                </span>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-ink-muted">
                Shipping & taxes calculated at checkout
              </p>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-ink text-canvas text-[13px] font-medium hover:bg-brand transition-colors"
              >
                Checkout · {formatTND(subtotal)} <ArrowRight className="size-3.5" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="w-full h-11 rounded-full border border-line text-[12px] font-medium hover:bg-surface"
              >
                Continue shopping
              </button>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
}