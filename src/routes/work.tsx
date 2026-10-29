import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { X, Expand } from "lucide-react";
import { WORK, WORK_CATEGORIES, IMG } from "@/data/catalog";
import { PageHero, Placeholder, DemoImageNote } from "@/components/site/bits";
import { CtaBand } from "./index";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () => seo("Our Work — Printing, Embroidery & Branding Gallery", "Gallery of apparel printing, embroidery, corporate wear and promotional product branding by IX Concepts Limited, Kampala."),
  component: Work,
});

function Work() {
  const [cat, setCat] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const list = cat === "All" ? WORK : WORK.filter((w) => w.category === cat);

  useEffect(() => {
    if (active !== null) dlg.current?.showModal();
    else dlg.current?.close();
  }, [active]);

  return (
    <>
      <PageHero eyebrow="Our work" title="Branding, up close." intro="A gallery for completed printing and branding projects." img={IMG.embroidery} />
      <section className="container-x py-14 md:py-20">
        <Placeholder className="mb-10" title="Gallery uses sample visuals" hint="These images are temporary demo visuals, not completed IX Concepts projects. Replace them with authentic, approved project photographs before launch." />
        <div role="group" aria-label="Filter gallery" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {["All", ...WORK_CATEGORIES].map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
              className={`btn !min-h-10 shrink-0 !px-4 !text-sm ${cat === c ? "bg-espresso text-warm" : "border border-border bg-card text-espresso hover:border-espresso"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {list.map((w) => {
            const idx = WORK.indexOf(w);
            return (
              <button key={idx} type="button" onClick={() => setActive(idx)} aria-label={`Enlarge: ${w.alt}`}
                className="img-zoom anim-rise group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid">
                <img src={w.img} alt={`${w.alt} — sample visual`} loading="lazy" className={`w-full object-cover ${w.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
                <DemoImageNote className="absolute left-3 top-3" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-espresso/80 to-transparent p-4 text-sm font-semibold text-warm opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {w.category} <Expand className="h-4 w-4" />
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <dialog ref={dlg} onClose={() => setActive(null)} onClick={(e) => e.target === dlg.current && setActive(null)}
        className="m-auto max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-espresso p-0 backdrop:bg-espresso/80">
        {active !== null && (
          <figure className="relative">
            <img src={WORK[active].img} alt={WORK[active].alt} className="max-h-[85vh] w-auto object-contain" />
            <figcaption className="p-4 text-sm text-warm">{WORK[active].category} · sample visual</figcaption>
            <button type="button" autoFocus onClick={() => setActive(null)} aria-label="Close" className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-warm text-espresso"><X /></button>
          </figure>
        )}
      </dialog>
      <CtaBand />
    </>
  );
}
