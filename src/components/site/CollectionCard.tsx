import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Collection } from "@/data/catalog";
export function CollectionCard({ collection: c }: { collection: Collection }) {
  return <article className="group"><Link to="/collections/$slug" params={{ slug: c.slug }} className="img-zoom block aspect-[3/2] overflow-hidden rounded"><img src={c.img} alt={`${c.brand} coordinated merchandise collection`} width={1536} height={1024} loading="lazy" className="h-full w-full object-cover" /></Link><div className="mt-5 flex items-start justify-between gap-3"><div><p className="concept-label text-muted-foreground">Concept Demonstration</p><h3 className="mt-2 text-2xl font-bold"><Link to="/collections/$slug" params={{ slug: c.slug }}>{c.name}</Link></h3><p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{c.description}</p></div><Link to="/collections/$slug" params={{ slug: c.slug }} aria-label={`Explore ${c.name}`} className="mt-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-sand"><ArrowUpRight size={20} /></Link></div></article>;
}
