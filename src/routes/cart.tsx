import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/lib/cart";
import { formatTND } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your bag — MOXMALL" },
      { name: "description", content: "Review your bag and checkout on MOXMALL." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 200 ? 0 : 12;
  const total = subtotal + shipping;

  if (detailed.length === 0) {
    return (
      <SiteLayout>
        <div className="mox-container py-32 text-center">
          <p className="eyebrow">Your bag</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl font-extrabold tracking-tighter">
            It's quiet in here.
          </h1>
          <p className="mt-4 text-ink-muted">Discover something worth keeping.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm hover:bg-brand transition-colors"
          >
            Browse shop <ArrowRight className="size-4" />
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mox-container pt-14 pb-10">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl font-extrabold tracking-tighter">
          Your bag
        </h1>
      </section>

      <section className="mox-container grid lg:grid-cols-[1fr_400px] gap-12 pb-24">
        <div className="divide-y divide-line border-y border-line">
          {detailed.map((l) => (
            <div key={l.productId} className="flex gap-5 py-6">
              <img
                src={l.product.image}
                alt=""
                className="size-28 rounded-2xl object-cover bg-surface"
              />
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between gap-3">
                  <Link
                    to="/product/$id"
                    params={{ id: l.product.id }}
                    className="font-medium hover:text-brand transition-colors"
                  >
                    {l.product.name}
                  </Link>
                  <span className="font-mono">{formatTND(l.product.price * l.quantity)}</span>
                </div>
                <p className="text-xs text-ink-muted mt-1">
                  {l.product.colors[0]} · {l.product.categoryLabel}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="inline-flex items-center border border-line rounded-full">
                    <button
                      onClick={() => setQty(l.productId, l.quantity - 1)}
                      className="grid size-9 place-items-center hover:bg-surface rounded-l-full"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-mono">{l.quantity}</span>
                    <button
                      onClick={() => setQty(l.productId, l.quantity + 1)}
                      className="grid size-9 place-items-center hover:bg-surface rounded-r-full"
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

        <aside className="lg:sticky lg:top-24 lg:self-start rounded-3xl border border-line bg-surface/40 p-8">
          <p className="eyebrow">Order summary</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">Subtotal</dt>
              <dd className="font-mono">{formatTND(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Shipping</dt>
              <dd className="font-mono">{shipping === 0 ? "Free" : formatTND(shipping)}</dd>
            </div>
            <div className="border-t border-line pt-3 flex items-baseline justify-between">
              <dt className="font-medium">Total</dt>
              <dd className="font-display text-2xl font-extrabold">{formatTND(total)}</dd>
            </div>
          </dl>
          <input
            placeholder="Discount code"
            className="mt-6 w-full h-11 rounded-full bg-canvas border border-line px-4 text-sm outline-none focus:border-ink transition-colors"
          />
          <button className="mt-4 w-full h-12 rounded-full bg-ink text-canvas text-[13px] font-medium hover:bg-brand transition-colors inline-flex items-center justify-center gap-2">
            Proceed to checkout <ArrowRight className="size-3.5" />
          </button>
          <div className="mt-6 flex items-center justify-around text-[11px] font-mono uppercase tracking-widest text-ink-muted">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3" /> Secure
            </span>
            <span className="flex items-center gap-1">
              <Truck className="size-3" /> 48h
            </span>
            <span>TND</span>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}