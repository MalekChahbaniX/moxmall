import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop all — MOXMALL" },
      {
        name: "description",
        content:
          "Browse apparel, audio, objects, workspace and accessories from MOXMALL. Curated, delivered across Tunisia.",
      },
      { property: "og:title", content: "Shop all — MOXMALL" },
      {
        property: "og:description",
        content: "Curated apparel, audio, objects and workspace essentials.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const products = useMemo(() => {
    let list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sort]);

  return (
    <SiteLayout>
      <section className="mox-container pt-14 pb-8">
        <p className="eyebrow">The shop</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]">
          Everything, curated.
        </h1>
        <p className="mt-5 max-w-xl text-ink-muted">
          {PRODUCTS.length * 18} products across {CATEGORIES.length} universes. Filter,
          sort, and find your next favorite object.
        </p>
      </section>

      <section className="mox-container">
        <div className="sticky top-16 z-30 -mx-6 px-6 py-4 bg-canvas/85 backdrop-blur-md border-y border-line flex items-center gap-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setCat("all")}
            className={pill(cat === "all")}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => setCat(c.slug)} className={pill(cat === c.slug)}>
              {c.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="size-3.5 text-ink-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent text-[12px] font-mono uppercase tracking-widest outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="my-24 text-center">
          <p className="eyebrow">End of results</p>
          <p className="mt-3 text-ink-muted">
            More arriving weekly. Subscribe below to catch each drop first.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

const pill = (active: boolean) =>
  `shrink-0 px-4 h-9 inline-flex items-center rounded-full text-[12px] font-medium transition-colors border ${
    active
      ? "bg-ink text-canvas border-ink"
      : "bg-canvas text-ink border-line hover:border-ink"
  }`;