/**
 * CENTRAL SITE CONFIGURATION — edit business details here only.
 * Values set to null are not yet verified and are hidden / shown as placeholders.
 */
export const SITE = {
  name: "IX Concepts Limited",
  shortName: "IX Concepts",
  city: "Kampala, Uganda",
  description:
    "Custom apparel, printing, embroidery and promotional merchandise for businesses and organisations in Kampala, Uganda.",
  /** Digits only, international format, no "+" or spaces. TO CONFIRM before launch. */
  whatsappNumber: "256759606713",
  /** Human-readable phone. TO CONFIRM before launch. */
  phoneDisplay: "+256 759 606 713",
  phoneTel: "+256759606713",
  email: null as string | null, // e.g. "hello@example.com" once verified
  address: null as string | null, // physical address once verified
  mapsUrl: null as string | null, // Google Maps link once verified
  openingHours: null as string | null, // e.g. "Mon–Sat, 8:00–18:00" once verified
  social: [] as { label: string; url: string }[], // e.g. { label: "Instagram", url: "https://..." }
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/work", label: "Our Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
