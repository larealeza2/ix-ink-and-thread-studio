// Temporary demo visuals (AI-generated). Replace with approved IX Concepts photography.
import hero from "@/assets/hero.jpg";
import tshirt from "@/assets/tshirt.jpg";
import cap from "@/assets/cap.jpg";
import hoodie from "@/assets/hoodie.jpg";
import corporate from "@/assets/corporate.jpg";
import promo from "@/assets/promo.jpg";
import embroidery from "@/assets/embroidery.jpg";
import printing from "@/assets/printing.jpg";

export const IMG = { hero, tshirt, cap, hoodie, corporate, promo, embroidery, printing };

export const SERVICES = [
  {
    id: "custom-apparel",
    title: "Custom Clothing",
    short: "T-shirts, caps, hoodies and customised apparel.",
    body: "Customised T-shirts, caps, hoodies and other garments carrying your logo, artwork or message — for teams, events, launches and everyday brand presence.",
    img: tshirt,
  },
  {
    id: "corporate-wear",
    title: "Corporate Wear",
    short: "Branded clothing and uniforms for businesses and organisations.",
    body: "Branded shirts, uniforms (including security uniforms) and professional clothing that give your staff a consistent, recognisable look.",
    img: corporate,
  },
  {
    id: "printing-embroidery",
    title: "Printing & Embroidery",
    short: "Garment printing, embroidered logos and customised designs.",
    body: "Printed designs sit on the surface of the fabric and suit bold, detailed or full-colour artwork. Embroidery stitches your design with thread, giving a textured, durable finish that suits logos on shirts, caps and uniforms. Tell us about your artwork and we'll advise on the right option.",
    img: embroidery,
  },
  {
    id: "promotional-merchandise",
    title: "Promotional Merchandise",
    short: "Branded gifts and promotional products.",
    body: "Personalised gifts and branded products for campaigns, events, clients and staff appreciation.",
    img: promo,
  },
] as const;

export const CATEGORIES = ["T-shirts", "Caps", "Hoodies", "Corporate shirts", "Uniforms", "Promotional merchandise"] as const;
export type Category = (typeof CATEGORIES)[number];

export const PRODUCTS: { name: string; category: Category; desc: string; img: string }[] = [
  { name: "Custom printed T-shirt", category: "T-shirts", desc: "Your logo or artwork on everyday tees.", img: tshirt },
  { name: "Embroidered cap", category: "Caps", desc: "Stitched logo caps for teams and events.", img: cap },
  { name: "Branded hoodie", category: "Hoodies", desc: "Comfortable hoodies with your branding.", img: hoodie },
  { name: "Corporate shirt", category: "Corporate shirts", desc: "Professional shirts with embroidered logos.", img: corporate },
  { name: "Staff & security uniforms", category: "Uniforms", desc: "Consistent branded uniforms for your team.", img: corporate },
  { name: "Promotional gift set", category: "Promotional merchandise", desc: "Branded mugs, totes, notebooks and more.", img: promo },
  { name: "Event T-shirts", category: "T-shirts", desc: "Matching tees for launches and campaigns.", img: printing },
  { name: "Personalised gifts", category: "Promotional merchandise", desc: "Branded products for clients and staff.", img: promo },
];

export const WORK_CATEGORIES = ["Apparel printing", "Embroidery", "Corporate wear", "Promotional products"] as const;
export const WORK: { img: string; category: (typeof WORK_CATEGORIES)[number]; alt: string; tall?: boolean }[] = [
  { img: printing, category: "Apparel printing", alt: "Screen printing ink onto a garment", tall: false },
  { img: embroidery, category: "Embroidery", alt: "Embroidery machine stitching a design", tall: false },
  { img: corporate, category: "Corporate wear", alt: "Folded corporate shirts", tall: true },
  { img: promo, category: "Promotional products", alt: "Promotional merchandise flat lay", tall: true },
  { img: cap, category: "Embroidery", alt: "Embroidered caps", tall: true },
  { img: tshirt, category: "Apparel printing", alt: "Custom T-shirt on a hanger", tall: true },
  { img: hoodie, category: "Apparel printing", alt: "Folded hoodie detail", tall: true },
  { img: hero, category: "Corporate wear", alt: "Branded apparel arrangement", tall: false },
];
