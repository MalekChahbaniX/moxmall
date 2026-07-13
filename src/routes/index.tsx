import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Award, Truck, ShieldCheck, Gem } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS, BRANDS } from "@/lib/products";
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
        eyebrow="This season"
        title="The most coveted timepieces"
        products={PRODUCTS.slice(0, 4)}
      />
      <FlashDeal />
      <ProductRail
        eyebrow="Maison's selection"
        title="Made to be inherited"
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
      {/* Ambient background image */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Luxury Swiss automatic timepiece with sunburst navy dial"
          width={1600}
          height={1200}
          fetchPriority="high"
          className="size-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        <div className="absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full bg-brand/10 blur-[120px]" />
      </div>

      <div className="relative mox-container min-h-[92vh] flex flex-col justify-center py-24">
        <div className="max-w-2xl animate-reveal">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-brand" />
            Chapter XII · Winter 2026
          </p>
          <h1 className="mt-8 font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(3.25rem,8.5vw,7rem)]">
            The measure
            <br />
            of a <em className="gold-text not-italic font-normal italic">lifetime.</em>
          </h1>
          <p className="mt-10 max-w-xl text-lg text-white/70 leading-relaxed font-light">
            A private house of Swiss horology — chronographs, GMTs, dive and dress watches
            hand-selected from the maisons that define time itself.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4 animate-reveal" style={{ animationDelay: "220ms" }}>
            <Link to="/shop" className="btn-gold-solid group">
              Explore the collection
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/about" className="btn-gold">
              The maison
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-8 animate-reveal" style={{ animationDelay: "380ms" }}>
            <div>
              <p className="font-display text-3xl font-light gold-text">180+</p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">Timepieces</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-display text-3xl font-light gold-text">42</p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">Swiss maisons</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-display text-3xl font-light gold-text">2y</p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">Warranty</p>
            </div>
          </div>
        </div>

        <Link
          to="/product/$id"
          params={{ id: "sonic-one" }}
          className="hidden lg:flex absolute right-10 bottom-14 items-center gap-4 glass-panel rounded-full pl-2 pr-6 py-2 hover:border-brand/40 transition-colors group"
        >
          <img src={PRODUCTS[0].image} alt="" className="size-14 rounded-full object-cover" />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-brand">Featured</p>
            <p className="font-display text-sm mt-0.5">{PRODUCTS[0].name}</p>
          </div>
          <ArrowUpRight className="size-4 text-white/50 group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Truck, title: "White-glove delivery", detail: "48 h across Tunisia" },
    { icon: ShieldCheck, title: "Authenticated", detail: "Every serial verified" },
    { icon: Award, title: "2-year warranty", detail: "International coverage" },
    { icon: Gem, title: "Lifetime servicing", detail: "In-house watchmakers" },
  ];
  return (
    <section className="border-y border-white/5 bg-black">
      <div className="mox-container grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
        {items.map((i, idx) => (
          <div key={idx} className="flex items-center gap-4 px-6 py-7">
            <i.icon className="size-5 text-brand shrink-0" strokeWidth={1.25} />
            <div className="min-w-0">
              <p className="text-[13px] font-medium leading-tight text-white">{i.title}</p>
              <p className="text-[10px] text-ink-muted font-mono uppercase tracking-[0.24em] truncate mt-1">
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
    { img: catApparel, name: "Dress Watches", tag: "42 references", span: "md:col-span-5 md:row-span-2" },
    { img: catTech, name: "Dive & Sport", tag: "36 references", span: "md:col-span-7" },
    { img: catHome, name: "Pilot & Chrono", tag: "28 references", span: "md:col-span-7" },
  ];
  return (
    <section className="mox-container py-24">
      <SectionHeader
        eyebrow="The chapters"
        title="Explore by discipline"
        action={{ label: "All collections", to: "/shop" }}
      />
      <div className="mt-10 grid gap-4 md:gap-6 md:grid-cols-12 md:grid-rows-2 md:h-[720px]">
        {cats.map((c) => (
          <Link
            key={c.name}
            to="/shop"
            className={`relative overflow-hidden rounded-3xl border border-white/5 group ${c.span} min-h-[280px] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.25)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_70px_-20px_rgba(15,95,77,0.4)] hover:border-brand/30`}
          >
            <img
              src={c.img}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-8 bottom-8 flex items-end justify-between text-white">
              <div>
                <p className="eyebrow">{c.tag}</p>
                <p className="mt-2 font-display text-3xl md:text-4xl font-light tracking-tight">
                  {c.name}
                </p>
              </div>
              <span className="grid size-12 place-items-center rounded-full border border-brand/60 text-brand translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md bg-black/30">
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
      <div className="group relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-[#0f0f0f] via-black to-[#0a0a0a] text-white p-10 md:p-16 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_40px_80px_-20px_rgba(15,95,77,0.45)] hover:border-brand/40">
        <div className="absolute -right-24 -top-24 size-[500px] rounded-full bg-brand/15 blur-[100px]" />
        <div className="absolute -left-24 -bottom-24 size-96 rounded-full bg-brand/10 blur-[80px]" />
        <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="eyebrow">Private allocation · Ending soon</p>
            <h3 className="mt-6 font-display text-4xl md:text-6xl font-light tracking-tight leading-[1.05]">
              Aviator Chrono Titanium
              <br />
              <span className="gold-text italic">reserved for members.</span>
            </h3>
            <p className="mt-6 max-w-md text-white/60 leading-relaxed">
              A limited private allocation of our titanium pilot chronograph, presented
              first to registered members. Ships within 48 hours in bespoke walnut case.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link to="/shop" className="btn-gold-solid">
                Reserve yours <ArrowRight className="size-3.5" />
              </Link>
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">
                8 pieces remaining
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
                className="rounded-2xl bg-white/5 border border-white/10 py-8 text-center backdrop-blur"
              >
                <p className="font-display text-4xl md:text-6xl font-light tracking-tight tabular-nums gold-text">
                  {c.v}
                </p>
                <p className="mt-3 text-[9px] font-mono uppercase tracking-[0.28em] text-white/40">
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
    <section className="border-y border-white/5 py-14 overflow-hidden bg-black">
      <p className="eyebrow text-center mb-8">The maisons we carry</p>
      <div className="flex gap-24 whitespace-nowrap animate-marquee">
        {loop.map((b, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl font-light tracking-[0.28em] text-white/30 hover:text-brand transition-colors"
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
        "The Meridian arrived in a walnut presentation case with a hand-written serial card. The dial catches every light. Pure horological restraint.",
      name: "Yasmine B.",
      loc: "Tunis",
      rating: 5,
    },
    {
      quote:
        "The concierge held the Regatta for a private viewing in Sfax. This is how a watch should be bought — with time, and with taste.",
      name: "Karim H.",
      loc: "Sfax",
      rating: 5,
    },
    {
      quote:
        "I finally own a Nocturne. MOXMALL is the first Tunisian house to sell watches with the discretion the pieces deserve.",
      name: "Nour E.",
      loc: "Sousse",
      rating: 5,
    },
  ];
  return (
    <section className="mox-container py-24">
      <SectionHeader eyebrow="From our collectors" title="4.9 across 2,400 private sales" />
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <figure
            key={i}
            className="rounded-3xl border border-white/5 bg-[#0d0d0d] p-10 flex flex-col justify-between min-h-[280px] hover:border-brand/30 transition-colors duration-500"
          >
            <div>
              <div className="flex gap-1 text-brand text-lg">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <blockquote className="mt-6 text-[15px] leading-relaxed text-white/85 font-light italic">
                “{r.quote}”
              </blockquote>
            </div>
            <figcaption className="mt-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink-muted mt-1">
                  {r.loc}
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-brand/70">
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
    { v: "180+", l: "Timepieces curated" },
    { v: "48 h", l: "White-glove delivery" },
    { v: "2,400", l: "Private collectors" },
    { v: "4.9★", l: "Collector rating" },
  ];
  return (
    <section className="mox-container pb-24">
      <div className="rounded-3xl bg-[#0d0d0d] border border-white/5 p-12 md:p-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-display text-5xl md:text-6xl font-light tracking-tight gold-text">
                {s.v}
              </p>
              <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.28em] text-ink-muted">
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
        <h2 className="mt-5 font-display text-3xl md:text-5xl font-light tracking-tight leading-[1.05]">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          to={action.to}
          className="hidden md:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.28em] text-brand hover:text-brand-hover transition-colors shrink-0"
        >
          {action.label} <ArrowRight className="size-3" />
        </Link>
      )}
    </div>
  );
}
