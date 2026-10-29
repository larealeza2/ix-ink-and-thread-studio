import { describe, it, expect } from "vitest";
import { waLink, buildQuoteMessage } from "./whatsapp";

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
});
