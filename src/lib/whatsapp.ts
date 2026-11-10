import { SITE } from "@/config/site";

export function waLink(text?: string, number: string = SITE.whatsappNumber) {
  const digits = number.replace(/\D/g, "");
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}

export type QuoteData = {
  name: string;
  phone: string;
  product: string;
  quantity: string;
  colours?: string;
  design?: string;
  date?: string;
  notes?: string;
  items?: string;
};

export const QUOTE_LABELS: Record<keyof QuoteData, string> = {
  name: "Full name",
  phone: "Phone number",
  product: "Product / service",
  quantity: "Quantity",
  colours: "Preferred colours",
  design: "Design / branding requirements",
  date: "Required completion date",
  notes: "Additional information",
  items: "Selected products",
};

export function buildQuoteMessage(d: QuoteData) {
  const lines = (Object.keys(QUOTE_LABELS) as (keyof QuoteData)[])
    .filter((k) => d[k] && String(d[k]).trim())
    .map((k) => `• ${QUOTE_LABELS[k]}: ${String(d[k]).trim()}`);
  return [`Hello ${SITE.shortName}, I'd like to request a quote.`, "", ...lines].join("\n");
}

export const productEnquiry = (name: string) =>
  waLink(`Hello ${SITE.shortName}, I'd like to enquire about: ${name}.`);

export const collectionEnquiry = (name: string, products: string[]) =>
  waLink(`Hello ${SITE.shortName}, I’d like to discuss a collection: ${name}. Products: ${products.join(", ")}. Please adapt this to my brand.`);
