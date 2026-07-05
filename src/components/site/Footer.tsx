import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-canvas mt-32">
      <div className="mox-container py-20">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-canvas/40">Inner circle</p>
            <h3 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tighter leading-[0.95]">
              Stay ahead <br />
              of every drop.
            </h3>
            <form
              className="mt-8 flex items-center border-b border-canvas/20 focus-within:border-brand transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="flex-1 bg-transparent py-3 outline-none text-sm placeholder:text-canvas/30"
              />
              <button className="px-4 py-3 text-[11px] font-mono uppercase tracking-widest hover:text-brand transition-colors">
                Subscribe →
              </button>
            </form>
            <p className="mt-3 text-[11px] text-canvas/40 font-mono">
              Weekly editorial + early access. No spam.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            <FooterCol title="Shop">
              <Link to="/shop">All Products</Link>
              <Link to="/shop">New Arrivals</Link>
              <Link to="/shop">Best Sellers</Link>
              <Link to="/shop">Flash Deals</Link>
            </FooterCol>
            <FooterCol title="Support">
              <Link to="/contact">Track Order</Link>
              <Link to="/contact">Returns</Link>
              <Link to="/contact">Shipping</Link>
              <Link to="/contact">Contact</Link>
            </FooterCol>
            <FooterCol title="Company">
              <Link to="/about">About</Link>
              <Link to="/about">Journal</Link>
              <Link to="/about">Careers</Link>
              <Link to="/about">Press</Link>
            </FooterCol>
            <FooterCol title="Legal">
              <Link to="/about">Privacy</Link>
              <Link to="/about">Terms</Link>
              <Link to="/about">Refund Policy</Link>
              <Link to="/about">Cookies</Link>
            </FooterCol>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-canvas/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter opacity-20">
            MOXMALL
          </div>
          <div className="flex items-center gap-6 text-canvas/50">
            <a href="#" aria-label="Instagram" className="hover:text-canvas transition-colors">
              <Instagram className="size-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-canvas transition-colors">
              <Twitter className="size-4" />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-canvas transition-colors">
              <Youtube className="size-4" />
            </a>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-canvas/40">
            © 2026 Moxmall • Tunis, TN • TND
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-canvas/40">{title}</p>
      <ul className="mt-5 space-y-3 text-sm text-canvas/70 [&_a:hover]:text-canvas [&_a]:transition-colors">
        {Array.isArray(children)
          ? children.map((c, i) => <li key={i}>{c}</li>)
          : <li>{children}</li>}
      </ul>
    </div>
  );
}