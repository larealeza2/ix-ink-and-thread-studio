import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG } from "@/data/catalog";
import { PageHero, Placeholder, SectionHeading } from "@/components/site/bits";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "./index";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us — Printing & Custom Apparel Studio in Kampala", "IX Concepts Limited focuses on printing, customised apparel, branding and promotional products for businesses in Kampala, Uganda."),
  component: About,
});

// Each block: replace `hint` with approved text, or delete the entry.
const BLOCKS: [string, string][] = [
  ["Founding story", "Add approved founding story here."],
  ["History", "Add verified company history here."],
  ["Mission", "Add approved mission statement here."],
  ["Vision", "Add approved vision statement here."],
  ["Values", "Add approved company values here."],
  ["Team", "Add approved team introduction and photos here."],
  ["Achievements", "Add verified achievements here."],
  ["Awards", "Add verified award here."],
  ["Certifications", "Add verified certifications here."],
  ["Community involvement", "Add approved community initiatives here."],
];

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="A studio for brands that show up." intro="IX Concepts Limited is a printing, custom apparel and branding business based in Kampala, Uganda." img={IMG.corporate} />
      <section className="container-x grid gap-12 py-16 md:grid-cols-2 md:py-28">
        <SectionHeading eyebrow="Company overview" title="Printing, apparel and branding — under one roof." />
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>We help businesses, organisations and individuals put their identity on the things people wear and use — custom T-shirts, caps and hoodies, corporate wear and uniforms, garment printing, embroidery and promotional merchandise.</p>
          <p>Every project starts with a conversation about your brand, your audience and your timeline.</p>
          <Link to="/services" className="btn btn-secondary">See our services</Link>
        </Reveal>
      </section>
      <section className="bg-sand-soft py-16 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="To be confirmed" title="Company profile" intro="These sections are awaiting approved information from IX Concepts Limited." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BLOCKS.map(([t, h], i) => (
              <Reveal key={t} delay={(i % 3) * 80}><Placeholder title={t} hint={h} className="h-full" /></Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
