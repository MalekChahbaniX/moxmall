import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "New Arrivals" },
  { to: "/shop", label: "Editorial" },
  { to: "/about", label: "About" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-canvas/80 backdrop-blur-xl border-b border-line/70"
            : "bg-canvas border-b border-transparent"
        }`}
      >
        <div className="mox-container flex h-16 items-center justify-between gap-6">
          <Link
            to="/"
            className="font-display text-lg font-extrabold tracking-tighter uppercase text-ink"
          >
            Moxmall
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="text-[13px] font-medium text-ink-muted hover:text-ink transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-full bg-surface border border-line/80 text-[12px] text-ink-muted hover:bg-line/40 transition-colors font-mono"
            >
              <Search className="size-3.5" />
              <span>Search products…</span>
            </button>
            <IconLink label="Wishlist">
              <Heart className="size-4" />
            </IconLink>
            <IconLink label="Account">
              <User className="size-4" />
            </IconLink>
            <button
              onClick={() => setOpen(true)}
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-surface transition-colors"
            >
              <ShoppingBag className="size-4" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid min-w-4 h-4 px-1 place-items-center rounded-full bg-brand text-canvas font-mono text-[10px] font-semibold">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconLink({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-surface transition-colors"
    >
      {children}
    </button>
  );
}