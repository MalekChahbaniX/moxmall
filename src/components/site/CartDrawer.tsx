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
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-[460px] bg-[#0d0d0d] border-l border-white/5 shadow-[var(--shadow-lift)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between px-8 py-6 border-b border-white/5">
            <div>
              <p className="eyebrow">Your bag</p>
              <p className="mt-2 font-display text-xl font-normal tracking-tight">
                {count} {count === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close cart"
              className="grid size-10 place-items-center rounded-full border border-white/10 hover:text-brand hover:border-brand/40 transition-colors"
            >
              <X className="size-4" />
            </button>
          </header>

          {detailed.length === 0 ? (
            <div className="flex-1 grid place-items-center px-8 text-center">
              <div>
                <p className="font-display text-3xl font-light tracking-tight">Your vitrine is empty.</p>
                <p className="mt-3 text-sm text-ink-muted">
                  Discover a piece worthy of a lifetime.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="btn-gold mt-8"
                >
                  Explore collection <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-8 py-4 divide-y divide-white/5">
              {detailed.map((l) => (
                <div key={l.productId} className="flex gap-4 py-5">
                  <img
                    src={l.product.image}
                    alt=""
                    className="size-24 rounded-lg object-cover bg-surface"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-display text-[15px] truncate">{l.product.name}</p>
                      <p className="text-sm font-mono text-brand">{formatTND(l.product.price * l.quantity)}</p>
                    </div>
                    <p className="text-xs text-ink-muted mt-0.5">{l.product.colors[0]}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-white/10 rounded-full">
                        <button
                          onClick={() => setQty(l.productId, l.quantity - 1)}
                          className="grid size-8 place-items-center hover:text-brand rounded-l-full"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono">{l.quantity}</span>
                        <button
                          onClick={() => setQty(l.productId, l.quantity + 1)}
                          className="grid size-8 place-items-center hover:text-brand rounded-r-full"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(l.productId)}
                        className="text-[10px] font-mono uppercase tracking-[0.24em] text-ink-muted hover:text-brand"
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
            <footer className="border-t border-white/5 px-8 py-6 space-y-5 bg-black/60">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-3xl font-light tracking-tight gold-text">
                  {formatTND(subtotal)}
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-ink-muted">
                Shipping & taxes calculated at checkout
              </p>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="btn-gold-solid w-full"
              >
                Secure checkout <ArrowRight className="size-3.5" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="w-full h-11 rounded-full border border-white/10 text-[11px] font-mono uppercase tracking-[0.24em] text-ink-muted hover:text-brand hover:border-brand/40 transition-colors"
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