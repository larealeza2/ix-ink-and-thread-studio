import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG } from "@/data/catalog";
import { PageHero, Placeholder, SectionHeading } from "@/components/site/bits";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us — Printing & Custom Apparel Studio in Kampala", "IX Concepts Limited focuses on printing, customised apparel, branding and promotional products for businesses in Kampala, Uganda."),
  component: About,
});

const BLOCKS: [string, string][] = [
  ["Mission", "To help businesses and organisations in Uganda stand out through high-quality printing, custom apparel and branded merchandise."],
  ["Vision", "To be Kampala's most trusted partner for creative, wearable branding."],
  ["Creativity", "We bring fresh ideas to every design and help your artwork look its best on fabric."],
  ["Quality", "We use reliable materials and check every piece before it leaves our studio."],
  ["Reliability", "Clear quotes, honest timelines and agreed collection and delivery arrangements."],
  ["Our team", "Designers, printers and embroidery specialists who care about the details of your brand."],
];

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="A studio for brands that show up." intro="An independent creative merchandise studio in Kampala, connecting brands with the things people wear, carry and use." img={IMG.corporate} />
      <section className="container-x grid gap-12 py-16 md:grid-cols-2 md:py-28">
        <SectionHeading eyebrow="Company overview" title="A considered identity, on things that matter." />
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>We help businesses, organisations and individuals put their identity on the things people wear and use — custom T-shirts, caps and hoodies, corporate wear and uniforms, garment printing, embroidery and promotional merchandise.</p>
          <p>Every project starts with a conversation about your brand, your audience and your timeline.</p>
          <Link to="/services" className="btn btn-secondary">See our services</Link>
        </Reveal>
      </section>
      <section className="bg-sand-soft py-16 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Who we are" title="What drives us" intro="The principles behind every T-shirt, cap and uniform we produce." />
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
