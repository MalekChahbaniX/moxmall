import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS, BRANDS, formatTND } from "@/lib/products";
import hero from "@/assets/hero.jpg";
import catApparel from "@/assets/category-apparel.jpg";
import catHome from "@/assets/category-home.jpg";
import catTech from "@/assets/category-tech.jpg";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <TrustStrip />
      <FeaturedCategories />
      <ProductRail
        eyebrow="Trending now"
        title="This week's most wanted"
        products={PRODUCTS.slice(0, 4)}
      />
      <FlashDeal />
      <ProductRail
        eyebrow="Editors' picks"
        title="Objects worth keeping"
        products={PRODUCTS.slice(3).concat(PRODUCTS.slice(0, 1))}
      />
      <Brands />
      <Reviews />
      <Stats />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="mox-container pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-12">
          <div className="max-w-3xl animate-reveal">
            <p className="eyebrow">Editorial 04 · Fall 26</p>
            <h1 className="mt-5 font-display font-extrabold tracking-[-0.03em] leading-[0.88] text-[clamp(3rem,9vw,7.5rem)]">
              Everything you love. <br className="hidden md:block" />
              <span className="text-brand italic font-black">One place.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base md:text-lg text-ink-muted leading-relaxed">
              A quiet, curated marketplace for the objects, garments and tools that make daily
              life more considered. Shipped across Tunisia in 48 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 animate-reveal" style={{ animationDelay: "120ms" }}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-ink text-canvas text-sm font-medium hover:bg-brand transition-colors"
            >
              Shop the collection
              <span className="grid size-8 place-items-center rounded-full bg-canvas/15 group-hover:bg-canvas/25 transition-colors">
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line text-sm font-medium hover:bg-surface transition-colors"
            >
              Our story
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-12 h-[560px] md:h-[620px] animate-reveal" style={{ animationDelay: "180ms" }}>
          <div className="relative md:col-span-8 rounded-[28px] overflow-hidden group bg-surface">
            <img
              src={hero}
              alt="Editorial still-life featuring a matte black modular speaker, sculptural ceramic vase, folded linen and a small electric blue accent"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute inset-x-8 bottom-8 flex items-end justify-between text-canvas">
              <div>
                <p className="eyebrow text-canvas/60">Plate 01</p>
                <p className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight">
                  The quiet essentials — reimagined.
                </p>
              </div>
              <Link
                to="/shop"
                aria-label="Explore editorial"
                className="hidden md:grid size-14 place-items-center rounded-full bg-canvas text-ink hover:bg-brand hover:text-canvas transition-colors"
              >
                <ArrowUpRight className="size-5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-rows-2 gap-4 md:gap-6">
            <div className="relative rounded-[28px] overflow-hidden bg-brand text-canvas p-7 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-canvas/80">
                <Sparkles className="size-4" />
                <span className="eyebrow text-canvas/80">Flash access</span>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter">
                  40% off
                </p>
                <p className="mt-2 text-sm text-canvas/85">
                  Workspace essentials. Ends in 04:12:55.
                </p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1 text-[12px] font-mono uppercase tracking-widest hover:underline"
              >
                Shop now <ArrowRight className="size-3" />
              </Link>
            </div>
            <Link
              to="/product/$id"
              params={{ id: "sonic-one" }}
              className="relative rounded-[28px] overflow-hidden bg-ink group"
            >
              <img
                src={PRODUCTS[0].image}
                alt=""
                loading="lazy"
                className="size-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute inset-x-6 bottom-5 text-canvas">
                <p className="eyebrow text-canvas/60">Bestseller</p>
                <p className="mt-1 font-display text-xl font-bold">Sonic One</p>
                <p className="mt-1 text-xs text-canvas/70 font-mono">from {formatTND(1290)}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Truck, title: "48h delivery", detail: "Across Tunisia" },
    { icon: ShieldCheck, title: "Secure checkout", detail: "SSL · 3D Secure" },
    { icon: RotateCcw, title: "14-day returns", detail: "Free, no questions" },
    { icon: Sparkles, title: "Curated only", detail: "Every piece, chosen" },
  ];
  return (
    <section className="border-y border-line bg-surface/40">
      <div className="mox-container grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
        {items.map((i, idx) => (
          <div key={idx} className="flex items-center gap-3 px-5 py-5">
            <i.icon className="size-4 text-brand shrink-0" />
            <div className="min-w-0">
              <p className="text-[13px] font-medium leading-tight">{i.title}</p>
              <p className="text-[11px] text-ink-muted font-mono uppercase tracking-widest truncate">
                {i.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedCategories() {
  const cats = [
    { img: catApparel, name: "Apparel", tag: "128 pieces", span: "md:col-span-5 md:row-span-2" },
    { img: catTech, name: "Audio & Tech", tag: "42 pieces", span: "md:col-span-7" },
    { img: catHome, name: "Home & Objects", tag: "96 pieces", span: "md:col-span-7" },
  ];
  return (
    <section className="mox-container py-24">
      <SectionHeader
        eyebrow="Curated pillars"
        title="Shop by universe"
        action={{ label: "All categories", to: "/shop" }}
      />
      <div className="mt-10 grid gap-4 md:gap-6 md:grid-cols-12 md:grid-rows-2 md:h-[720px]">
        {cats.map((c) => (
          <Link
            key={c.name}
            to="/shop"
            className={`relative overflow-hidden rounded-[28px] group ${c.span} min-h-[280px]`}
          >
            <img
              src={c.img}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-canvas">
              <div>
                <p className="eyebrow text-canvas/70">{c.tag}</p>
                <p className="mt-1 font-display text-2xl md:text-3xl font-bold tracking-tight">
                  {c.name}
                </p>
              </div>
              <span className="grid size-11 place-items-center rounded-full bg-canvas text-ink translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductRail({
  eyebrow,
  title,
  products,
}: {
  eyebrow: string;
  title: string;
  products: typeof PRODUCTS;
}) {
  return (
    <section className="mox-container py-24">
      <SectionHeader eyebrow={eyebrow} title={title} action={{ label: "View all", to: "/shop" }} />
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function FlashDeal() {
  const [t, setT] = useState({ h: 4, m: 12, s: 55 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((v) => {
        let s = v.s - 1;
        let m = v.m;
        let h = v.h;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <section className="mox-container py-6">
      <div className="relative overflow-hidden rounded-[28px] bg-ink text-canvas p-8 md:p-14">
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-brand/30 blur-3xl" />
        <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="eyebrow text-canvas/60">Flash offer · Limited</p>
            <h3 className="mt-4 font-display text-4xl md:text-6xl font-extrabold tracking-tighter leading-[0.95]">
              Precision tools, <br />
              <span className="text-brand">up to 40% off.</span>
            </h3>
            <p className="mt-5 max-w-md text-canvas/70">
              A tightly-edited flash on workspace and audio essentials. Ships within 48 hours,
              only while inventory lasts.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-canvas text-ink text-[13px] font-medium hover:bg-brand hover:text-canvas transition-colors"
              >
                Shop flash <ArrowRight className="size-3.5" />
              </Link>
              <span className="text-[11px] font-mono uppercase tracking-widest text-canvas/50">
                17 items remaining
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { l: "Hours", v: pad(t.h) },
              { l: "Minutes", v: pad(t.m) },
              { l: "Seconds", v: pad(t.s) },
            ].map((c) => (
              <div
                key={c.l}
                className="rounded-2xl bg-canvas/5 border border-canvas/10 py-6 text-center backdrop-blur"
              >
                <p className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums">
                  {c.v}
                </p>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-canvas/50">
                  {c.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Brands() {
  const loop = [...BRANDS, ...BRANDS];
  return (
    <section className="border-y border-line py-10 overflow-hidden bg-surface/40">
      <p className="eyebrow text-center mb-6">Trusted partners</p>
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        {loop.map((b, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl font-extrabold tracking-tighter text-ink/40 hover:text-ink transition-colors"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    {
      quote:
        "The Sonic One is the first pair of headphones I've felt truly at home in. Packaging alone is worth framing.",
      name: "Yasmine B.",
      loc: "Tunis",
      rating: 5,
    },
    {
      quote:
        "Shipping was 36 hours to Sfax. The Nomad Folio already looks better than my three-year-old wallet.",
      name: "Karim H.",
      loc: "Sfax",
      rating: 5,
    },
    {
      quote:
        "MOXMALL feels like the first Tunisian store designed with taste. I've bought four things this month.",
      name: "Nour E.",
      loc: "Sousse",
      rating: 5,
    },
  ];
  return (
    <section className="mox-container py-24">
      <SectionHeader eyebrow="Reviews" title="4.9 average across 2,400+ orders" />
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <figure
            key={i}
            className="rounded-3xl border border-line bg-canvas p-8 flex flex-col justify-between min-h-[260px] hover:border-ink transition-colors"
          >
            <div>
              <div className="flex gap-1 text-brand">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <blockquote className="mt-5 text-[15px] leading-relaxed text-ink">
                “{r.quote}”
              </blockquote>
            </div>
            <figcaption className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-ink-muted">
                  {r.loc}
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                Verified
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "180+", l: "Curated brands" },
    { v: "48h", l: "Avg. delivery" },
    { v: "2,400", l: "Happy orders" },
    { v: "4.9★", l: "Customer rating" },
  ];
  return (
    <section className="mox-container pb-24">
      <div className="rounded-[28px] bg-surface border border-line p-10 md:p-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-display text-5xl md:text-6xl font-extrabold tracking-tighter">
                {s.v}
              </p>
              <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-ink-muted">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tighter leading-[0.95]">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          to={action.to}
          className="hidden md:inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors shrink-0"
        >
          {action.label} <ArrowRight className="size-3" />
        </Link>
      )}
    </div>
  );
}
