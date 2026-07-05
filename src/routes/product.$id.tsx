import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS, formatTND, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — MOXMALL" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — MOXMALL` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — MOXMALL` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  notFoundComponent: NotFoundView,
  errorComponent: () => (
    <SiteLayout>
      <div className="mox-container py-32 text-center">
        <p className="eyebrow">Error</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold">Something went wrong.</h1>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function NotFoundView() {
  return (
    <SiteLayout>
      <div className="mox-container py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold">Product not found</h1>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm"
        >
          Back to shop <ArrowRight className="size-4" />
        </Link>
      </div>
    </SiteLayout>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes?.[2] ?? undefined);
  const [qty, setQty] = useState(1);

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <div className="mox-container pt-8">
        <nav className="text-[11px] font-mono uppercase tracking-widest text-ink-muted">
          <Link to="/">Home</Link> · <Link to="/shop">Shop</Link> ·{" "}
          <span className="text-ink">{product.categoryLabel}</span>
        </nav>
      </div>

      <section className="mox-container py-8 grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-6 md:col-span-5 aspect-[4/5] rounded-[28px] overflow-hidden bg-surface">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
          <div className="hidden md:flex md:col-span-1 flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl overflow-hidden bg-surface border ${
                  i === 0 ? "border-ink" : "border-line"
                }`}
              >
                <img src={product.image} alt="" className="size-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </div>

        <div className="md:sticky md:top-24 md:self-start">
          <p className="eyebrow">{product.categoryLabel}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tighter leading-[0.95]">
            {product.name}
          </h1>
          <p className="mt-3 text-ink-muted">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-extrabold">{formatTND(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm font-mono line-through text-ink-soft">
                {formatTND(product.compareAt)}
              </span>
            )}
            <span className="ml-auto text-[11px] font-mono uppercase tracking-widest text-brand">
              {product.stock > 5 ? "In stock" : `Only ${product.stock} left`}
            </span>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className="eyebrow mb-3">Color · {color}</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 h-10 rounded-full text-[12px] font-medium border transition-colors ${
                      color === c
                        ? "bg-ink text-canvas border-ink"
                        : "bg-canvas text-ink border-line hover:border-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {product.sizes && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="eyebrow">Size</p>
                  <button className="text-[11px] font-mono uppercase tracking-widest text-ink-muted underline">
                    Size guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`h-11 rounded-full text-sm font-medium border transition-colors ${
                        size === s
                          ? "bg-ink text-canvas border-ink"
                          : "bg-canvas text-ink border-line hover:border-ink"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-stretch gap-3">
              <div className="inline-flex items-center border border-line rounded-full">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="grid size-11 place-items-center hover:bg-surface rounded-l-full"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-mono">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="grid size-11 place-items-center hover:bg-surface rounded-r-full"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <button
                onClick={() => add(product.id, qty)}
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full bg-ink text-canvas text-[13px] font-medium hover:bg-brand transition-colors"
              >
                Add to bag · {formatTND(product.price * qty)}
              </button>
              <button
                aria-label="Save"
                className="grid size-11 place-items-center rounded-full border border-line hover:bg-surface"
              >
                <Heart className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { icon: Truck, l: "48h delivery" },
                { icon: RotateCcw, l: "14-day returns" },
                { icon: ShieldCheck, l: "Secure payment" },
              ].map((b) => (
                <div
                  key={b.l}
                  className="rounded-2xl border border-line px-3 py-3 flex items-center gap-2"
                >
                  <b.icon className="size-3.5 text-brand shrink-0" />
                  <span className="text-[11px] font-medium truncate">{b.l}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-line pt-6 space-y-4">
              <div>
                <p className="eyebrow mb-2">Description</p>
                <p className="text-sm leading-relaxed text-ink-muted">{product.description}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">Specifications</p>
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                  {product.specs.map((s) => (
                    <div key={s.label} className="contents">
                      <dt className="text-ink-muted">{s.label}</dt>
                      <dd className="text-ink font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mox-container py-20">
        <p className="eyebrow">You may also like</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold tracking-tighter">
          Pairs beautifully with
        </h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}