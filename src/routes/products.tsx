import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, PRODUCTS, IMG, type Category } from "@/data/catalog";
import { PageHero } from "@/components/site/bits";
import { ProductCard } from "@/components/site/ProductCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () => seo("Products — T-shirts, Caps, Hoodies & Promotional Merchandise", "Browse custom T-shirts, caps, hoodies, corporate shirts, uniforms and promotional merchandise in Uganda. Enquire for a quote."),
  component: Products,
});

function Products() {
  const [cat, setCat] = useState<Category | "All">("All");
  const list = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  return (
    <>
      <PageHero eyebrow="Products" title="Choose it. Brand it." intro="Explore the products we customise. Pricing depends on quantity and design — send an enquiry and we'll prepare a quote." img={IMG.hero} />
      <section className="container-x py-14 md:py-20">
        <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
              className={`btn !min-h-10 shrink-0 !px-4 !text-sm ${cat === c ? "bg-espresso text-warm" : "border border-border bg-card text-espresso hover:border-espresso"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <div key={p.name} className="anim-rise"><ProductCard {...p} /></div>
          ))}
        </div>
      </section>
    </>
  );
}
