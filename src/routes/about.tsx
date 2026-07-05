import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MOXMALL" },
      {
        name: "description",
        content:
          "MOXMALL is a Tunis-based marketplace curating premium apparel, audio, objects and workspace essentials.",
      },
      { property: "og:title", content: "About — MOXMALL" },
      {
        property: "og:description",
        content: "A curated marketplace built in Tunis for a considered life.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="mox-container pt-20 pb-24 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]">
            A quieter kind of <br />
            <span className="text-brand italic">marketplace.</span>
          </h1>
        </div>
        <div className="md:col-span-5 md:pt-10 space-y-6 text-ink-muted leading-relaxed">
          <p>
            MOXMALL was founded in Tunis in 2026 with a single conviction: online shopping should
            feel like walking into a store you trust — not a spreadsheet with pictures.
          </p>
          <p>
            We curate every brand, edit every photograph, and refuse the noise that has become
            standard elsewhere. What remains is a small, growing catalog of objects, garments and
            tools built to last.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-surface/40">
        <div className="mox-container grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line">
          {[
            { v: "2026", l: "Founded in Tunis" },
            { v: "180+", l: "Brands curated" },
            { v: "48h", l: "Nationwide delivery" },
            { v: "4.9★", l: "Customer rating" },
          ].map((s) => (
            <div key={s.l} className="p-8">
              <p className="font-display text-5xl font-extrabold tracking-tighter">{s.v}</p>
              <p className="mt-2 eyebrow">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mox-container py-24 grid md:grid-cols-3 gap-10">
        {[
          {
            t: "Curation",
            d: "Every product is chosen by our editors. No dropshipping, no filler, no compromise.",
          },
          {
            t: "Craft",
            d: "We favor small workshops and lasting materials — objects designed to be kept, not replaced.",
          },
          {
            t: "Care",
            d: "Careful packaging, fast delivery, honest support. The way it should be, everywhere.",
          },
        ].map((v) => (
          <div key={v.t} className="border-t border-ink pt-6">
            <p className="font-display text-2xl font-extrabold tracking-tight">{v.t}</p>
            <p className="mt-3 text-ink-muted leading-relaxed">{v.d}</p>
          </div>
        ))}
      </section>

      <section className="mox-container pb-32 text-center">
        <p className="eyebrow">Ready?</p>
        <h2 className="mt-3 font-display text-4xl md:text-6xl font-extrabold tracking-tighter">
          Start with what you love.
        </h2>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm hover:bg-brand transition-colors"
        >
          Enter the shop →
        </Link>
      </section>
    </SiteLayout>
  );
}