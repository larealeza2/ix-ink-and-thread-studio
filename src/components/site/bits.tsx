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
  return (
    <section className="border-b border-border bg-sand-soft">
      <div className="container-x grid items-end gap-10 py-14 md:grid-cols-[1.3fr_1fr] md:py-24">
        <div>
          <p className="eyebrow anim-rise text-terracotta-deep">{eyebrow}</p>
          <h1 className="anim-rise mt-4 text-4xl font-extrabold leading-[1] text-espresso md:text-7xl" style={{ animationDelay: "80ms" }}>{title}</h1>
          <p className="anim-rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "160ms" }}>{intro}</p>
        </div>
        {img && (
          <div className="anim-rise hidden aspect-[4/3] overflow-hidden rounded-2xl md:block" style={{ animationDelay: "240ms" }}>
            <img src={img} alt="" className="anim-zoom h-full w-full object-cover" width={1280} height={960} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Simple titled info card. */
export function Placeholder({ title, hint, className = "" }: { title: string; hint: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      <PenLine className="h-5 w-5 text-terracotta-deep" aria-hidden />
      <h3 className="mt-4 text-lg font-bold text-espresso">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  );
}

export const DemoImageNote = (_: { className?: string }) => null;
const _UnusedNote = ({ className = "" }: { className?: string }) => (
  <span className={`eyebrow rounded-full bg-espresso/80 px-2.5 py-1 text-[0.6rem] text-warm backdrop-blur ${className}`}>Sample visual</span>
);
