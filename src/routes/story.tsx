import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/data/catalog";
import { PageHero, Placeholder, SectionHeading } from "@/components/site/bits";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "./index";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/story")({
  head: () => seo("Company Story & Achievements", "The story, milestones, achievements and production capabilities of IX Concepts Limited, Kampala."),
  component: Story,
});

// Replace each milestone with a verified year + description, or delete.
const MILESTONES = [
  { year: "Year TBC", text: "Add verified founding milestone here." },
  { year: "Year TBC", text: "Add verified growth milestone here." },
  { year: "Year TBC", text: "Add verified milestone here." },
  { year: "Today", text: "Add approved description of current focus here." },
];

function Story() {
  return (
    <>
      <PageHero eyebrow="Story & achievements" title="How we got here." intro="Draft page — all content below is placeholder until approved by IX Concepts Limited." img={IMG.printing} />
      <section className="container-x py-16 md:py-28">
        <SectionHeading eyebrow="Milestones" title="Our journey" />
        <ol className="mt-12 border-l-2 border-sand">
          {MILESTONES.map((m, i) => (
            <Reveal as="li" key={i} delay={i * 80} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-warm bg-terracotta" aria-hidden />
              <p className="font-display text-sm font-bold text-terracotta-deep">{m.year}</p>
              <p className="mt-1 text-lg text-espresso">{m.text}</p>
              <span className="eyebrow mt-2 inline-block text-[0.6rem] text-olive-deep">Draft placeholder</span>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="bg-sand-soft py-16 md:py-24">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Achievements", "Add verified achievement here."],
            ["Awards", "Add verified award here."],
            ["Certifications", "Add verified certification here."],
            ["Team highlights", "Add approved team highlights here."],
            ["Production capabilities", "Add confirmed equipment and capabilities here."],
            ["Community involvement", "Add approved community work here."],
          ].map(([t, h], i) => (
            <Reveal key={t} delay={(i % 3) * 80}><Placeholder title={t} hint={h} className="h-full" /></Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
