import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white mt-32 border-t border-white/5">
      <div className="mox-container py-20">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Private circle</p>
            <h3 className="mt-6 font-display text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              Receive the <em className="gold-text not-italic font-normal">next chapter</em>
              <br />before anyone else.
            </h3>
            <form
              className="mt-10 flex items-center border-b border-white/15 focus-within:border-brand transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="flex-1 bg-transparent py-4 outline-none text-sm placeholder:text-white/25"
              />
              <button className="px-4 py-3 text-[11px] font-mono uppercase tracking-[0.28em] text-brand hover:text-brand-hover transition-colors">
                Subscribe →
              </button>
            </form>
            <p className="mt-4 text-[11px] text-white/40 font-mono tracking-wider">
              Private previews & new arrivals. Discreet by design.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            <FooterCol title="Collection">
              <Link to="/shop">All Timepieces</Link>
              <Link to="/shop">New Arrivals</Link>
              <Link to="/shop">Limited Editions</Link>
              <Link to="/shop">Vintage</Link>
            </FooterCol>
            <FooterCol title="Concierge">
              <Link to="/contact">Order Tracking</Link>
              <Link to="/contact">Servicing</Link>
              <Link to="/contact">Authentication</Link>
              <Link to="/contact">Contact</Link>
            </FooterCol>
            <FooterCol title="Maison">
              <Link to="/about">Our Story</Link>
              <Link to="/about">Journal</Link>
              <Link to="/about">Boutique</Link>
              <Link to="/about">Careers</Link>
            </FooterCol>
            <FooterCol title="Legal">
              <Link to="/about">Privacy</Link>
              <Link to="/about">Terms</Link>
              <Link to="/about">Warranty</Link>
              <Link to="/about">Cookies</Link>
            </FooterCol>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="font-display text-4xl md:text-6xl font-light tracking-[0.24em] text-white/10">
            MOXMALL
          </div>
          <div className="flex items-center gap-6 text-white/40">
            <a href="#" aria-label="Instagram" className="hover:text-brand transition-colors">
              <Instagram className="size-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-brand transition-colors">
              <Twitter className="size-4" />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-brand transition-colors">
              <Youtube className="size-4" />
            </a>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/30">
            © 2026 MOXMALL Maison · Tunis · TND
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-6 space-y-4 text-[13px] text-white/60 [&_a:hover]:text-brand [&_a]:transition-colors">
        {Array.isArray(children)
          ? children.map((c, i) => <li key={i}>{c}</li>)
          : <li>{children}</li>}
      </ul>
    </div>
  );
}