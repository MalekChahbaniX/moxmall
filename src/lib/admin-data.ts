import { PRODUCTS, formatTND } from "./products";

export { formatTND };

export type OrderStatus = "paid" | "processing" | "shipped" | "refunded" | "pending";

export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  city: string;
  total: number;
  items: number;
  status: OrderStatus;
  placedAt: string;
};

export const ORDERS: AdminOrder[] = [
  { id: "MX-10429", customer: "Yasmine Ben Ali", email: "yasmine.b@moxmail.tn", city: "Tunis", total: 1290, items: 1, status: "paid", placedAt: "2026-07-06T09:12:00" },
  { id: "MX-10428", customer: "Omar Trabelsi", email: "omar.t@moxmail.tn", city: "Sfax", total: 725, items: 2, status: "processing", placedAt: "2026-07-06T08:41:00" },
  { id: "MX-10427", customer: "Salma Ferchichi", email: "salma.f@moxmail.tn", city: "Sousse", total: 3980, items: 1, status: "shipped", placedAt: "2026-07-05T22:03:00" },
  { id: "MX-10426", customer: "Mehdi Kacem", email: "mehdi.k@moxmail.tn", city: "Ariana", total: 210, items: 1, status: "paid", placedAt: "2026-07-05T18:22:00" },
  { id: "MX-10425", customer: "Rania Gharbi", email: "rania.g@moxmail.tn", city: "La Marsa", total: 385, items: 1, status: "pending", placedAt: "2026-07-05T14:07:00" },
  { id: "MX-10424", customer: "Karim Bouazizi", email: "karim.b@moxmail.tn", city: "Nabeul", total: 970, items: 3, status: "shipped", placedAt: "2026-07-05T11:49:00" },
  { id: "MX-10423", customer: "Nour Chaabane", email: "nour.c@moxmail.tn", city: "Bizerte", total: 245, items: 1, status: "refunded", placedAt: "2026-07-04T20:16:00" },
  { id: "MX-10422", customer: "Amine Zouari", email: "amine.z@moxmail.tn", city: "Tunis", total: 720, items: 1, status: "paid", placedAt: "2026-07-04T16:32:00" },
];

export const CUSTOMERS = [
  { id: "c-01", name: "Yasmine Ben Ali", email: "yasmine.b@moxmail.tn", orders: 8, spent: 6420, city: "Tunis", tier: "VIP" },
  { id: "c-02", name: "Omar Trabelsi", email: "omar.t@moxmail.tn", orders: 5, spent: 2140, city: "Sfax", tier: "Repeat" },
  { id: "c-03", name: "Salma Ferchichi", email: "salma.f@moxmail.tn", orders: 3, spent: 4890, city: "Sousse", tier: "VIP" },
  { id: "c-04", name: "Mehdi Kacem", email: "mehdi.k@moxmail.tn", orders: 2, spent: 560, city: "Ariana", tier: "New" },
  { id: "c-05", name: "Rania Gharbi", email: "rania.g@moxmail.tn", orders: 1, spent: 385, city: "La Marsa", tier: "New" },
  { id: "c-06", name: "Karim Bouazizi", email: "karim.b@moxmail.tn", orders: 4, spent: 2360, city: "Nabeul", tier: "Repeat" },
];

export const REVENUE_SERIES = [
  { day: "Mon", revenue: 4200, orders: 12 },
  { day: "Tue", revenue: 5100, orders: 15 },
  { day: "Wed", revenue: 3800, orders: 11 },
  { day: "Thu", revenue: 6400, orders: 19 },
  { day: "Fri", revenue: 8200, orders: 26 },
  { day: "Sat", revenue: 9600, orders: 31 },
  { day: "Sun", revenue: 7100, orders: 22 },
];

export const KPIS = {
  revenue: 44380,
  revenueDelta: 12.4,
  orders: 136,
  ordersDelta: 8.1,
  customers: 92,
  customersDelta: 4.7,
  conversion: 3.2,
  conversionDelta: -0.4,
};

export const ADMIN_PRODUCTS = PRODUCTS.map((p, i) => ({
  ...p,
  sku: `MX-${p.category.slice(0, 3).toUpperCase()}-${(i + 1).toString().padStart(3, "0")}`,
  sold: 40 - i * 3 + (i % 2) * 12,
  status: p.stock > 10 ? "active" : p.stock > 0 ? "low" : "out",
}));
