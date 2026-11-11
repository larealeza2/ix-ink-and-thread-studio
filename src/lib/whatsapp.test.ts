import { describe, it, expect } from "vitest";
import { waLink, buildQuoteMessage, collectionEnquiry, productEnquiry } from "./whatsapp";

describe("whatsapp", () => {
  it("uses digits-only number 256759606713", () => {
    expect(waLink()).toBe("https://wa.me/256759606713");
  });
  it("URL-encodes the message", () => {
    expect(waLink("a b&c")).toBe("https://wa.me/256759606713?text=a%20b%26c");
  });
  it("includes only filled fields", () => {
    const m = buildQuoteMessage({ name: "Jo", phone: "0700", product: "Caps", quantity: "50", colours: "" });
    expect(m).toContain("Quantity: 50");
    expect(m).not.toContain("Preferred colours");
  });
  it("preserves product-specific messages and the existing destination", () => {
    expect(productEnquiry("Cotton tote bag")).toBe("https://wa.me/256759606713?text=" + encodeURIComponent("Hello IX Concepts, I'd like to enquire about: Cotton tote bag."));
  });
  it("passes the complete collection to WhatsApp", () => {
    const url = new URL(collectionEnquiry("The Team Edition", ["Corporate shirt", "Reusable bottle"]));
    expect(url.pathname).toBe("/256759606713");
    expect(url.searchParams.get("text")).toContain("The Team Edition. Products: Corporate shirt, Reusable bottle.");
  });
  it("includes every selected product in a multi-product quote", () => {
    const message = buildQuoteMessage({ name: "Jane", phone: "", product: "Brand kit", quantity: "", items: "Cotton tote bag\nReusable bottle" });
    expect(message).toContain("Selected products: Cotton tote bag\nReusable bottle");
    expect(message).not.toContain("Quantity:");
  });
});
