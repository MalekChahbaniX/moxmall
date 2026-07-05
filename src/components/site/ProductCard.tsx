import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatTND, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
        <Link to="/product/$id" params={{ id: product.id }} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </Link>

        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
              product.badge === "flash"
                ? "bg-brand text-canvas"
                : product.badge === "limited"
                  ? "bg-ink text-canvas"
                  : "bg-canvas text-ink border border-line"
            }`}
          >
            {product.badge === "flash"
              ? `-${Math.round((1 - product.price / (product.compareAt ?? product.price)) * 100)}%`
              : product.badge}
          </span>
        )}

        <button
          aria-label="Save"
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-canvas/80 backdrop-blur border border-line text-ink opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:text-brand"
        >
          <Heart className="size-4" />
        </button>

        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => add(product.id)}
            className="w-full h-11 rounded-full bg-ink text-canvas text-[12px] font-medium tracking-wide hover:bg-brand transition-colors"
          >
            Quick add
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="text-sm font-medium truncate hover:text-brand transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-xs text-ink-muted mt-0.5 truncate">{product.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-mono">{formatTND(product.price)}</p>
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