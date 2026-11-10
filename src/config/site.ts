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
  /** Digits only, international format, no "+" or spaces. */
  whatsappNumber: "256759606713",
  /** Human-readable phone. */
  phoneDisplay: "+256 759 606 713",
  phoneTel: "+256759606713",
  email: "info@ixconcepts.co.ug" as string | null,
  address: "Nasser Road, Kampala, Uganda" as string | null,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nasser+Road+Kampala" as string | null,
  openingHours: "Mon–Sat, 8:00 am – 6:00 pm" as string | null,
  social: [] as { label: string; url: string }[], // e.g. { label: "Instagram", url: "https://..." }
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/collections", label: "Collections" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
