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
    name: "Sonic One Modular",
    tagline: "Reference over-ear headphones",
    price: 1290,
    compareAt: 1490,
    image: headphones,
    category: "audio",
    categoryLabel: "Audio",
    badge: "bestseller",
    colors: ["Matte Obsidian", "Bone"],
    stock: 24,
    description:
      "Reference-grade over-ear headphones with adaptive noise cancellation, 60-hour battery, and hand-finished aluminum yokes. Engineered for critical listening and long sessions.",
    specs: [
      { label: "Driver", value: "40mm beryllium" },
      { label: "Battery", value: "60 h" },
      { label: "Weight", value: "285 g" },
      { label: "Connectivity", value: "BT 5.3 / USB-C" },
    ],
  },
  {
    id: "aura-vase",
    name: "Aura Ceramic Vessel",
    tagline: "Hand-thrown sculptural vase",
    price: 340,
    image: vase,
    category: "objects",
    categoryLabel: "Objects",
    badge: "new",
    colors: ["Bone", "Terracotta"],
    stock: 12,
    description:
      "A sculptural vessel hand-thrown in a small Tunisian atelier, finished in a matte glaze that catches morning light. Every piece is unique.",
    specs: [
      { label: "Material", value: "Stoneware" },
      { label: "Height", value: "32 cm" },
      { label: "Finish", value: "Matte glaze" },
      { label: "Origin", value: "Nabeul, TN" },
    ],
  },
  {
    id: "nomad-folio",
    name: "Nomad Leather Folio",
    tagline: "Vegetable-tanned cardholder",
    price: 245,
    image: wallet,
    category: "accessories",
    categoryLabel: "Accessories",
    colors: ["Cognac", "Ink"],
    stock: 40,
    description:
      "A slim folio in full-grain vegetable-tanned leather that develops a personal patina with use. Fits eight cards and folded notes.",
    specs: [
      { label: "Material", value: "Full-grain leather" },
      { label: "Capacity", value: "8 cards" },
      { label: "Dimensions", value: "10 × 8 cm" },
      { label: "Made in", value: "Tunis" },
    ],
  },
  {
    id: "linear-lamp",
    name: "Orbital Task Light",
    tagline: "Articulated desk lamp",
    price: 720,
    image: lamp,
    category: "workspace",
    categoryLabel: "Workspace",
    badge: "flash",
    compareAt: 890,
    colors: ["Obsidian", "Chrome"],
    stock: 8,
    description:
      "An articulated task light in matte aluminum with a warm 2700K LED core. Weighted base, magnetic head, tactile dial.",
    specs: [
      { label: "Bulb", value: "LED 2700K, 9W" },
      { label: "Reach", value: "68 cm" },
      { label: "Materials", value: "Aluminum, steel" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  {
    id: "box-hoodie",
    name: "Heavyweight Box Hoodie",
    tagline: "500 gsm organic cotton",
    price: 385,
    image: hoodie,
    category: "apparel",
    categoryLabel: "Apparel",
    badge: "new",
    colors: ["Sand", "Onyx", "Bone"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 60,
    description:
      "A boxy pullover in 500 gsm loopback organic cotton, garment-dyed for a soft hand. Reinforced ribbing, twin-needle stitching, no drawcord.",
    specs: [
      { label: "Weight", value: "500 gsm" },
      { label: "Fiber", value: "Organic cotton" },
      { label: "Fit", value: "Boxy, oversized" },
      { label: "Care", value: "Cold wash, hang dry" },
    ],
  },
  {
    id: "aeriform-01",
    name: "Aeriform Chrono 01",
    tagline: "Titanium automatic",
    price: 3980,
    image: watch,
    category: "accessories",
    categoryLabel: "Accessories",
    badge: "limited",
    colors: ["Titanium / Navy"],
    stock: 3,
    description:
      "A 39mm titanium automatic with sapphire crystal, integrated bracelet, and a sunburst navy dial. Limited run of 200.",
    specs: [
      { label: "Movement", value: "Swiss auto, 72h" },
      { label: "Case", value: "39 mm Ti Grade 5" },
      { label: "Water", value: "100 m" },
      { label: "Edition", value: "200 pieces" },
    ],
  },
  {
    id: "pour-vessel",
    name: "Pour Vessel",
    tagline: "Ceramic + walnut dripper",
    price: 210,
    image: dripper,
    category: "objects",
    categoryLabel: "Objects",
    colors: ["Bone / Walnut"],
    stock: 30,
    description:
      "A porcelain pour-over set with a solid walnut collar and hand-blown carafe. A calm ritual, engineered.",
    specs: [
      { label: "Capacity", value: "600 ml" },
      { label: "Materials", value: "Porcelain, glass, walnut" },
      { label: "Dishwasher", value: "No" },
      { label: "Origin", value: "Handmade" },
    ],
  },
];

export const CATEGORIES = [
  { slug: "apparel", label: "Apparel", count: 128 },
  { slug: "audio", label: "Audio", count: 42 },
  { slug: "objects", label: "Objects", count: 96 },
  { slug: "workspace", label: "Workspace", count: 63 },
  { slug: "accessories", label: "Accessories", count: 74 },
];

export const BRANDS = [
  "AERIFORM",
  "NOMAD",
  "AURA",
  "SONIC",
  "LINEAR",
  "MAISON 04",
  "ATELIER T",
  "OBJET.",
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatTND = (n: number) =>
  new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    maximumFractionDigits: 0,
  }).format(n);