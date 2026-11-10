import type { ReactNode } from "react";
import { PenLine } from "lucide-react";
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, intro, light = false }: { eyebrow: string; title: ReactNode; intro?: string; light?: boolean }) {
  return (
    <Reveal className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-sand" : "text-terracotta-deep"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold leading-[1.05] md:text-5xl ${light ? "text-warm" : "text-espresso"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-sand-soft" : "text-muted-foreground"}`}>{intro}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, intro, img }: { eyebrow: string; title: string; intro: string; img?: string }) {
  return <section className="relative overflow-hidden border-b border-border bg-background">
    {img && <img src={img} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover object-center opacity-15" />}
    <div className="container-x relative py-14 md:py-24"><p className="eyebrow anim-rise text-terracotta-deep">{eyebrow}</p><h1 className="anim-rise mt-5 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{title}</h1><p className="anim-rise mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p></div>
  </section>;
}

/** Simple titled info card. */
export function Placeholder({ title, hint, className = "" }: { title: string; hint: string; className?: string }) {
  return (
    <div className={`border-t border-border py-6 ${className}`}>
      <PenLine className="h-5 w-5 text-terracotta-deep" aria-hidden />
      <h3 className="mt-4 text-lg font-bold text-espresso">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  );
}

export const DemoImageNote = (_: { className?: string }) => null;

