import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shirt, Briefcase, Scissors, Gift } from "lucide-react";
import { IMG, SERVICES, PRODUCTS, WORK } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading, Placeholder, DemoImageNote } from "@/components/site/bits";
import { ProductCard } from "@/components/site/ProductCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Custom T-shirt Printing & Branding in Kampala",
      "Custom T-shirt printing, corporate wear, embroidery and promotional merchandise in Kampala, Uganda. Request a quote on WhatsApp.",
    ),
  component: Home,
});

// Editable proposed marketing copy (not official slogans).
const HERO = {
  label: "Printing · Branding · Custom Apparel",
  title: ["Your brand.", "Our creativity."],
  text: "Custom apparel, printing and branding solutions designed to help your business stand out.",
};

const ICONS: typeof Shirt[] = [Shirt, Briefcase, Scissors, Gift];
const FEATURED = ["T-shirts", "Caps", "Hoodies", "Corporate shirts", "Promotional merchandise"].map(
  (c) => PRODUCTS.find((p) => p.category === c)!,
);

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-espresso">
        <img src={IMG.hero} alt="Custom terracotta and olive T-shirts, a hoodie and a cap" width={1920} height={1088} className="anim-zoom absolute inset-0 h-full w-full object-cover object-[70%_center]" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/55 to-espresso/10" />
        <div className="container-x relative flex min-h-[86vh] flex-col justify-end pb-14 pt-28 md:min-h-[88vh] md:justify-center md:pb-24">
          <p className="eyebrow anim-rise text-sand">{HERO.label}</p>
          <h1 className="mt-5 max-w-4xl text-[2.9rem] font-extrabold uppercase leading-[0.95] text-warm sm:text-6xl md:text-8xl">
            {HERO.title.map((l, i) => (
              <span key={l} className="anim-rise block" style={{ animationDelay: `${120 + i * 120}ms` }}>
                {i === 1 ? <span className="text-sand">{l}</span> : l}
              </span>
            ))}
          </h1>
          <p className="anim-rise mt-6 max-w-lg text-lg leading-relaxed text-warm/90" style={{ animationDelay: "380ms" }}>{HERO.text}</p>
          <div className="anim-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "480ms" }}>
            <Link to="/products" className="btn btn-primary">Explore Our Products <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/quote" className="btn btn-light">Request a Quote</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-20 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="What we do" title={<>Branding you can<br className="hidden md:block" /> wear and share.</>} intro="Custom T-shirt printing, corporate wear, embroidery and promotional merchandise for businesses and organisations in Kampala." />
          <Reveal><Link to="/services" className="link-underline inline-flex items-center gap-2 font-semibold text-terracotta-deep">All services <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i] ?? Shirt;
            return (
              <Reveal key={s.id} delay={i * 90}>
                <Link to="/services" hash={s.id} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors duration-300 hover:border-terracotta">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-olive/15 text-olive-deep transition-colors group-hover:bg-terracotta group-hover:text-warm"><Icon className="h-5 w-5" /></span>
                  <span className="mt-8 font-display text-xs font-bold text-muted-foreground">0{i + 1}</span>
                  <h3 className="mt-1 text-xl font-bold text-espresso">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-terracotta-deep">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-sand/40 py-20 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Featured products" title="Made for your brand." />
            <Reveal><Link to="/products" className="link-underline inline-flex items-center gap-2 font-semibold text-terracotta-deep">Browse products <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURED.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}><ProductCard name={p.category} category={p.name} img={p.img} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="container-x py-20 md:py-32">
        <SectionHeading eyebrow="Our work" title="Craft in the details." intro="Printing, embroidery and branded merchandise produced for businesses, schools, churches and events across Kampala." />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {WORK.slice(0, 5).map((w, i) => (
            <Reveal key={i} variant="image" delay={i * 80} className={`img-zoom relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}>
              <img src={w.img} alt={`${w.alt}`} loading="lazy" className="h-full w-full object-cover" />
              <DemoImageNote className="absolute left-3 top-3" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10"><Link to="/work" className="btn btn-secondary">View Our Work <ArrowRight className="h-4 w-4" /></Link></Reveal>
      </section>

      {/* STORY PREVIEW */}
      <section className="border-y border-border bg-sand-soft py-20 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Our story" title="Built on creativity and care." intro="We started with a simple belief: every business deserves branding that looks as good as its work. Today we help organisations across Uganda wear their identity with pride." />
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal><Placeholder title="Kampala-made" hint="Designed, printed and finished locally, with close attention to every order." /></Reveal>
            <Reveal delay={80}><Placeholder title="Every order size" hint="From a handful of event tees to large corporate uniform runs." /></Reveal>
            <Reveal delay={160}><Placeholder title="Quality first" hint="Durable prints, clean embroidery and careful quality checks before delivery." /></Reveal>
            <Reveal delay={240} className="flex items-end"><Link to="/story" className="btn btn-olive w-full">Read the full story <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function CtaBand() {
  return (
    <section className="bg-espresso">
      <div className="container-x py-20 text-center md:py-32">
        <Reveal>
          <p className="eyebrow text-sand">Start a project</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] text-warm md:text-7xl">Let's build your brand.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-sand-soft">Tell us what you need, and let's explore the right branding solution for your business.</p>
          <Link to="/quote" className="btn btn-primary mt-10">Start Your Enquiry <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}
