import hero from "@/assets/hero.jpg";
import tshirt from "@/assets/tshirt.jpg";
import cap from "@/assets/cap.jpg";
import hoodie from "@/assets/hoodie.jpg";
import corporate from "@/assets/corporate.jpg";
import promo from "@/assets/promo.jpg";
import embroidery from "@/assets/embroidery.jpg";
import printing from "@/assets/printing.jpg";
import studio from "@/assets/studio-collection.jpg";
import team from "@/assets/team-collection.jpg";
import event from "@/assets/event-collection.jpg";
import mug from "@/assets/mug.jpg";
import bottle from "@/assets/bottle.jpg";
import notebook from "@/assets/notebook.jpg";
import tote from "@/assets/tote.jpg";
import lanyard from "@/assets/lanyard.jpg";
import pouch from "@/assets/pouch.jpg";

export const IMG = { hero, tshirt, cap, hoodie, corporate, promo, embroidery, printing, studio, team, event, mug, bottle, notebook, tote, lanyard, pouch };

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

export const CATEGORIES = ["Apparel", "Drinkware", "Stationery", "Bags", "Corporate Gifts", "Accessories"] as const;
export type Category = (typeof CATEGORIES)[number];
export type Product = { name: string; category: Category; desc: string; img: string; branding: string };
export const PRODUCTS: Product[] = [
  { name: "Custom printed T-shirt", category: "Apparel", desc: "An everyday canvas for a distinctive brand.", img: tshirt, branding: "Print · Embroidery" },
  { name: "Embroidered cap", category: "Apparel", desc: "A small detail. A recognisable identity.", img: cap, branding: "Embroidery" },
  { name: "Branded hoodie", category: "Apparel", desc: "Layer your team in a shared identity.", img: hoodie, branding: "Print · Embroidery" },
  { name: "Corporate shirt", category: "Apparel", desc: "Considered workwear for a cohesive team.", img: corporate, branding: "Embroidery" },
  { name: "Staff & security uniforms", category: "Apparel", desc: "Professional clothing, tailored to your team’s brief.", img: corporate, branding: "Print · Embroidery" },
  { name: "Event T-shirts", category: "Apparel", desc: "Bring a campaign or gathering together.", img: printing, branding: "Print" },
  { name: "Branded ceramic mug", category: "Drinkware", desc: "Keep your identity part of the everyday ritual.", img: mug, branding: "Custom branding" },
  { name: "Reusable bottle", category: "Drinkware", desc: "A useful companion for work and beyond.", img: bottle, branding: "Custom branding" },
  { name: "Branded notebook", category: "Stationery", desc: "A thoughtful home for ideas, plans and notes.", img: notebook, branding: "Custom branding" },
  { name: "Cotton tote bag", category: "Bags", desc: "A carry-everywhere expression of your brand.", img: tote, branding: "Print" },
  { name: "Branded zip pouch", category: "Bags", desc: "A compact organiser with a considered finish.", img: pouch, branding: "Custom branding" },
  { name: "Promotional gift set", category: "Corporate Gifts", desc: "Coordinated essentials for clients and colleagues.", img: team, branding: "Coordinated branding" },
  { name: "Personalised gifts", category: "Corporate Gifts", desc: "A considered combination, built around your brief.", img: studio, branding: "Coordinated branding" },
  { name: "Branded lanyard", category: "Accessories", desc: "Connect your identity to every interaction.", img: lanyard, branding: "Custom branding" },
];
export const CATEGORY_IMAGES: Record<Category, string> = {
  Apparel: tshirt, Drinkware: mug, Stationery: notebook, Bags: tote,
  "Corporate Gifts": team, Accessories: lanyard,
};
export type Collection = {
  slug: string; name: string; brand: string; type: string; description: string; img: string;
  products: string[]; objective: string; direction: string; applications: string; presentation: string;
};
export const COLLECTIONS: Collection[] = [
  {
    slug: "form-everyday", name: "The Everyday Identity", brand: "FORM", type: "Lifestyle merchandise",
    description: "Quietly confident essentials. A single identity, woven into the things people reach for every day.", img: studio,
    products: ["Custom printed T-shirt", "Embroidered cap", "Branded ceramic mug", "Branded notebook", "Cotton tote bag"],
    objective: "Explore how a simple botanical identity can feel equally at home on clothing, desk essentials and a carry-everywhere bag.",
    direction: "A restrained four-leaf symbol, spacious typography and natural textures. Olive and terracotta keep the range warm without losing clarity.",
    applications: "Small chest and cap placements balance more generous branding on the tote, mug and notebook. Each surface receives a proportion appropriate to its scale.",
    presentation: "A unified five-piece range with room to customise garment colours, logo placements and quantities around your own identity.",
  },
  {
    slug: "north-team", name: "The Team Edition", brand: "NORTH", type: "Corporate merchandise",
    description: "A cohesive welcome for a team on the move. Practical pieces, brought together by a clear identity.", img: team,
    products: ["Corporate shirt", "Reusable bottle", "Branded notebook", "Branded lanyard", "Branded zip pouch"],
    objective: "Create a thoughtful corporate welcome kit that carries one identity from the workplace into everyday life.",
    direction: "A precise wordmark, olive-led accessories and a crisp shirt. Terracotta provides a purposeful accent on the lanyard.",
    applications: "Subtle branding on workwear and useful accessories, with consistent visual proportions across materials.",
    presentation: "Five coordinated team essentials that can be adapted into onboarding, staff appreciation or conference merchandise.",
  },
  {
    slug: "common-ground", name: "The Gathering Kit", brand: "COMMON GROUND", type: "Event merchandise",
    description: "Made for moments that bring people together. A bold, friendly identity with life beyond the event.", img: event,
    products: ["Event T-shirts", "Embroidered cap", "Cotton tote bag", "Branded ceramic mug", "Branded lanyard"],
    objective: "Demonstrate an approachable event identity that remains recognisable across a coordinated merchandise range.",
    direction: "A terracotta circle and confident two-line wordmark, balanced with olive and warm neutral fabric.",
    applications: "A versatile identity on T-shirts, caps, totes and drinkware; accessories can be specified to suit your event.",
    presentation: "A flexible starting point for launches, community gatherings and cultural events, rather than a fixed off-the-shelf bundle.",
  },
];
export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);

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
