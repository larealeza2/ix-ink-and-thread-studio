import { describe, expect, it } from "vitest";
import { quoteSchema } from "./quote-schema";
import { COLLECTIONS, CATEGORIES, PRODUCTS } from "@/data/catalog";

describe("Merchandise quote rules", () => {
  it("allows an unknown quantity and no phone number", () => {
    expect(quoteSchema.safeParse({ name: "Jane", phone: "", product: "Cotton tote bag", quantity: "" }).success).toBe(true);
  });
  it("requires the customer's name and a product", () => {
    expect(quoteSchema.safeParse({ name: "", phone: "", product: "", quantity: "" }).success).toBe(false);
  });
  it("rejects an invalid phone when one is supplied", () => {
    expect(quoteSchema.safeParse({ name: "Jane", phone: "abc", product: "Cotton tote bag", quantity: "" }).success).toBe(false);
  });
  it("provides real catalog content for each of the six requested categories", () => {
    expect(CATEGORIES).toEqual(["Apparel", "Drinkware", "Stationery", "Bags", "Corporate Gifts", "Accessories"]);
    for (const category of CATEGORIES) expect(PRODUCTS.some(p => p.category === category)).toBe(true);
  });
  it("keeps every collection item available in the catalog", () => {
    for (const collection of COLLECTIONS) for (const name of collection.products) {
      expect(PRODUCTS.some(p => p.name === name)).toBe(true);
    }
  });
});