import { Link } from "@tanstack/react-router";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { productEnquiry } from "@/lib/whatsapp";
import { DemoImageNote } from "./bits";

export function ProductCard({ name, category, desc, img }: { name: string; category: string; desc?: string; img: string }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-sand-soft transition-transform duration-500 hover:-translate-y-1">
      <div className="img-zoom relative aspect-[4/5]">
        <img src={img} alt={`${name} — sample visual`} loading="lazy" width={896} height={1120} className="h-full w-full object-cover" />
        <DemoImageNote className="absolute left-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-olive-deep">{category}</p>
        <h3 className="mt-1.5 text-lg font-bold text-espresso">{name}</h3>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <a href={productEnquiry(name)} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-10 flex-1 !px-4 !text-sm">
            <MessageCircle className="h-4 w-4" /> Enquire
          </a>
          <Link to="/quote" search={{ product: name }} aria-label={`Request a quote for ${name}`} className="btn btn-secondary !min-h-10 !px-3.5 !text-sm">
            Quote <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
