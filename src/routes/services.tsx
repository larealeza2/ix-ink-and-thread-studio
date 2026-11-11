import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { IMG, SERVICES } from "@/data/catalog";
import { PageHero, DemoImageNote } from "@/components/site/bits";
import { Reveal } from "@/components/site/Reveal";
import { productEnquiry } from "@/lib/whatsapp";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => seo("Services — Custom Apparel, Corporate Wear & Embroidery", "Custom apparel, corporate wear and security uniforms, garment printing, embroidery and promotional merchandise in Kampala, Uganda."),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Everything your brand wears." intro="From custom T-shirts to corporate uniforms and branded gifts — here's how we can help your business stand out in Kampala and across Uganda." img={IMG.printing} />
      <div className="container-x py-16 md:py-28">
        {SERVICES.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-28 grid items-center gap-10 border-b border-border py-14 last:border-0 md:grid-cols-2 md:gap-20">
            <Reveal variant="image" className={`img-zoom relative aspect-[4/3] overflow-hidden rounded ${i % 2 ? "md:order-2" : ""}`}>
              <img src={s.img} alt={`${s.title}`} loading="lazy" className="h-full w-full object-cover" />
              <DemoImageNote className="absolute left-3 top-3" />
            </Reveal>
            <Reveal>
              <p className="font-display text-sm font-bold text-terracotta-deep">0{i + 1}</p>
              <h2 className="mt-2 text-3xl font-extrabold text-espresso md:text-5xl">{s.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-6 border-t border-border pt-5"><p className="eyebrow text-olive-deep">For your quotation</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Share your preferred products, approximate quantities, logo or artwork, branding placements and any important project dates. We’ll confirm suitable materials and finishes with you.</p></div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/quote" search={{ product: s.title }} className="btn btn-primary">Request a Quote</Link>
                <a href={productEnquiry(s.title)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
