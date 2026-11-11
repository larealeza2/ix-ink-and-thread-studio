import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/data/catalog";
import { PageHero, Placeholder, SectionHeading } from "@/components/site/bits";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/story")({
  head: () => seo("Company Story & Achievements", "The story, milestones, achievements and production capabilities of IX Concepts Limited, Kampala."),
  component: Story,
});

// Narrative stages avoid unverified dates and awards.
const MILESTONES = [
  { year: "The beginning", text: "IX Concepts starts in Kampala with T-shirt printing for local businesses and events." },
  { year: "Growing", text: "We add embroidery, caps and hoodies, serving schools, churches and corporate teams." },
  { year: "Expanding", text: "Corporate wear, security uniforms and promotional merchandise join our range." },
  { year: "Today", text: "A full printing and branding studio helping organisations across Uganda look their best." },
];

function Story() {
  return (
    <>
      <PageHero eyebrow="Story & achievements" title="From a mark to a movement." intro="Our approach to building an identity that lives beyond a logo — through apparel, objects and thoughtful detail." img={IMG.printing} />
      <section className="container-x py-16 md:py-28">
        <SectionHeading eyebrow="Milestones" title="More than a printed logo" />
        <ol className="mt-12 border-l-2 border-sand">
          {MILESTONES.map((m, i) => (
            <Reveal as="li" key={i} delay={i * 80} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-warm bg-terracotta" aria-hidden />
              <p className="font-display text-sm font-bold text-terracotta-deep">{m.year}</p>
              <p className="mt-1 text-lg text-espresso">{m.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="bg-sand-soft py-16 md:py-24">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {([
            ["Screen printing", "Bold prints for bulk T-shirt and hoodie orders."],
            ["Digital & DTF printing", "Full-colour, detailed artwork for short runs and custom pieces."],
            ["Embroidery", "Clean stitched logos on shirts, caps, uniforms and jackets."],
            ["Corporate uniforms", "Consistent staff and security uniforms specified around your team’s needs."],
            ["Promotional products", "Branded mugs, bags, notebooks and gifts for campaigns."],
            ["Community", "Proud to support schools, churches and local events in Kampala."],
          ] as [string, string][]).map(([t, h], i) => (
            <Reveal key={t} delay={(i % 3) * 80}><Placeholder title={t} hint={h} className="h-full" /></Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
