import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/shop", label: "Collection" },
  { to: "/shop", label: "New In" },
  { to: "/shop", label: "Maisons" },
  { to: "/about", label: "Journal" },
  { to: "/contact", label: "Boutique" },
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
            ? "bg-black/70 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mox-container flex h-20 items-center justify-between gap-6">
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-[0.32em] uppercase text-ink hover:text-brand transition-colors duration-500"
          >
            MOXMALL
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="relative text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted hover:text-brand transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-brand hover:after:w-full after:transition-all after:duration-500"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              className="hidden sm:grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-muted hover:text-brand hover:border-brand/50 transition-colors"
            >
              <Search className="size-4" />
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
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:text-brand hover:border-brand/50 transition-colors"
            >
              <ShoppingBag className="size-4" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid min-w-4 h-4 px-1 place-items-center rounded-full bg-brand text-black font-mono text-[10px] font-semibold">
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
      className="hidden sm:grid h-10 w-10 place-items-center rounded-full border border-transparent text-ink-muted hover:text-brand hover:border-brand/40 transition-colors"
    >
      {children}
    </button>
  );
}