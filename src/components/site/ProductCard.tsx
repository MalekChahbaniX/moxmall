import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatTND, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#0d0d0d] border border-white/5">
        <Link to="/product/$id" params={{ id: product.id }} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {product.badge && (
          <span
            className={`absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.28em] backdrop-blur-md ${
              product.badge === "flash"
                ? "bg-brand text-black"
                : product.badge === "limited"
                  ? "bg-black/80 text-brand border border-brand/40"
                  : "bg-white/10 text-white border border-white/20"
            }`}
          >
            {product.badge === "flash"
              ? `-${Math.round((1 - product.price / (product.compareAt ?? product.price)) * 100)}%`
              : product.badge}
          </span>
        )}

        <button
          aria-label="Save"
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-black/60 backdrop-blur border border-white/15 text-white/80 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:text-brand hover:border-brand/40"
        >
          <Heart className="size-4" />
        </button>

        <div className="absolute inset-x-4 bottom-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={() => add(product.id)}
            className="w-full h-11 rounded-full bg-white/10 border border-brand/50 backdrop-blur-md text-brand text-[11px] font-mono uppercase tracking-[0.24em] hover:bg-brand hover:text-black transition-all duration-500"
          >
            Add to bag
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] font-mono uppercase tracking-[0.28em] text-ink-muted mb-1">
            {product.categoryLabel}
          </p>
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="font-display text-[15px] font-normal truncate hover:text-brand transition-colors block"
          >
            {product.name}
          </Link>
          <p className="text-xs text-ink-muted mt-1 truncate">{product.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-mono text-brand tracking-wide">{formatTND(product.price)}</p>
          {product.compareAt && (
            <p className="text-[11px] font-mono text-ink-soft line-through">
              {formatTND(product.compareAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}