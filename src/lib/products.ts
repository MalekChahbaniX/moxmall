import headphones from "@/assets/product-headphones.jpg";
import vase from "@/assets/product-vase.jpg";
import wallet from "@/assets/product-wallet.jpg";
import lamp from "@/assets/product-lamp.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import watch from "@/assets/product-watch.jpg";
import dripper from "@/assets/product-dripper.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number; // TND
  compareAt?: number;
  image: string;
  category: "audio" | "objects" | "apparel" | "workspace" | "accessories";
  categoryLabel: string;
  badge?: "new" | "bestseller" | "limited" | "flash";
  colors: string[];
  sizes?: string[];
  stock: number;
  description: string;
  specs: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    id: "sonic-one",
    name: "Meridian Blue Automatic",
    tagline: "40mm steel · sunburst navy dial",
    price: 12900,
    compareAt: 14500,
    image: headphones,
    category: "audio",
    categoryLabel: "Dress",
    badge: "bestseller",
    colors: ["Steel / Navy", "Steel / Silver"],
    stock: 24,
    description:
      "A quietly commanding everyday automatic. 40mm brushed steel case, applied gold indices, and a sunburst navy dial finished by hand. Swiss automatic movement with 72-hour reserve.",
    specs: [
      { label: "Movement", value: "Swiss auto · 72h" },
      { label: "Case", value: "40 mm steel" },
      { label: "Water", value: "100 m" },
      { label: "Crystal", value: "Sapphire, AR-coated" },
    ],
  },
  {
    id: "aura-vase",
    name: "Orion Marine Diver",
    tagline: "Ceramic bezel · 200m automatic",
    price: 8600,
    image: vase,
    category: "objects",
    categoryLabel: "Diver",
    badge: "new",
    colors: ["Steel / Ocean Blue", "Steel / Onyx"],
    stock: 12,
    description:
      "A professional-grade diver with a scratch-resistant ceramic bezel, deep-blue sunburst dial and Super-LumiNova indices. Built for the water, cut for the wrist.",
    specs: [
      { label: "Movement", value: "Swiss auto · 60h" },
      { label: "Case", value: "42 mm steel" },
      { label: "Water", value: "200 m" },
      { label: "Bezel", value: "Sapphire ceramic" },
    ],
  },
  {
    id: "nomad-folio",
    name: "Nocturne Slim Dress",
    tagline: "Ultra-thin gold · roman index",
    price: 21400,
    image: wallet,
    category: "accessories",
    categoryLabel: "Dress",
    colors: ["Yellow Gold / Black", "Rose Gold / Ivory"],
    stock: 40,
    description:
      "A 6.4mm ultra-thin dress piece in solid gold, hand-guilloché silvered dial and painted roman numerals. The definitive evening watch — quiet, precise, unmistakable.",
    specs: [
      { label: "Movement", value: "Manual · 45h" },
      { label: "Case", value: "38 mm gold" },
      { label: "Thickness", value: "6.4 mm" },
      { label: "Strap", value: "Alligator leather" },
    ],
  },
  {
    id: "linear-lamp",
    name: "Aviator Chrono Titanium",
    tagline: "Pilot chronograph · titanium",
    price: 9800,
    image: lamp,
    category: "workspace",
    categoryLabel: "Pilot",
    badge: "flash",
    compareAt: 11900,
    colors: ["Titanium / Matte Black", "Titanium / Anthracite"],
    stock: 8,
    description:
      "A blacked-out titanium pilot chronograph. Matte dial, luminous white indices, day-date at three. Built to a military brief, dressed for the boardroom.",
    specs: [
      { label: "Movement", value: "Auto chrono · 48h" },
      { label: "Case", value: "43 mm titanium" },
      { label: "Water", value: "100 m" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  {
    id: "box-hoodie",
    name: "Hyperion Two-Tone GMT",
    tagline: "Steel & gold · true GMT",
    price: 15800,
    image: hoodie,
    category: "apparel",
    categoryLabel: "GMT",
    badge: "new",
    colors: ["Two-Tone / Green", "Two-Tone / Champagne"],
    stock: 60,
    description:
      "A traveller's GMT in polished two-tone steel and gold, with a fluted 24-hour bezel and lacquered green dial. Local time, home time, no compromise.",
    specs: [
      { label: "Movement", value: "GMT auto · 70h" },
      { label: "Case", value: "40 mm two-tone" },
      { label: "Water", value: "100 m" },
      { label: "Bracelet", value: "Jubilee, five-link" },
    ],
  },
  {
    id: "aeriform-01",
    name: "Regatta Chronograph",
    tagline: "Steel chrono · panda dial",
    price: 13200,
    image: watch,
    category: "accessories",
    categoryLabel: "Chrono",
    badge: "limited",
    colors: ["Steel / Black-Gold"],
    stock: 3,
    description:
      "A hand-assembled Swiss chronograph, black dial with gold sub-registers and a tachymeter scale. Vintage cognac leather strap. Limited to 200 pieces.",
    specs: [
      { label: "Movement", value: "Swiss auto, 72h" },
      { label: "Case", value: "41 mm steel" },
      { label: "Water", value: "100 m" },
      { label: "Edition", value: "200 pieces" },
    ],
  },
  {
    id: "pour-vessel",
    name: "Lunar Moonphase Rose Gold",
    tagline: "Moonphase complication",
    price: 32900,
    image: dripper,
    category: "objects",
    categoryLabel: "Complication",
    colors: ["Rose Gold / Ivory"],
    stock: 30,
    description:
      "A poetic moonphase in solid rose gold, silvered opaline dial, blued steel hands. A complication drawn from the night sky.",
    specs: [
      { label: "Movement", value: "Manual · 65h" },
      { label: "Case", value: "39 mm rose gold" },
      { label: "Complication", value: "Moonphase, date" },
      { label: "Strap", value: "Alligator leather" },
    ],
  },
];

export const CATEGORIES = [
  { slug: "audio", label: "Dress", count: 42 },
  { slug: "objects", label: "Diver", count: 36 },
  { slug: "workspace", label: "Pilot", count: 28 },
  { slug: "apparel", label: "GMT", count: 22 },
  { slug: "accessories", label: "Complications", count: 18 },
];

export const BRANDS = [
  "AERIFORM",
  "MERIDIAN",
  "ORION",
  "NOCTURNE",
  "HYPERION",
  "AVIATOR",
  "REGATTA",
  "LUNAR",
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatTND = (n: number) =>
  new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    maximumFractionDigits: 0,
  }).format(n);