import { Link } from "@tanstack/react-router";
import { MessageCircle, Plus, Check } from "lucide-react";
import { productEnquiry } from "@/lib/whatsapp";
import { useQuoteBasket } from "./QuoteBasket";
import { Button } from "@/components/ui/button";
export function ProductCard({ name, category, desc, img, branding }: { name: string; category: string; desc?: string; img: string; branding?: string }) {
 const { items, toggle } = useQuoteBasket(); const selected = items.includes(name);
 return <article className="group flex h-full flex-col"><Link to="/quote" search={{ product: name }} aria-label={`Request a quote for ${name}`} className="img-zoom product-image block aspect-[4/5] overflow-hidden rounded"><img src={img} alt={name} loading="lazy" width={768} height={960} className="h-full w-full object-cover" /></Link><div className="flex flex-1 flex-col pt-5"><p className="eyebrow text-olive-deep">{category}{branding && <span className="ml-2 font-normal normal-case text-muted-foreground">/ {branding}</span>}</p><h3 className="mt-2 text-lg font-bold">{name}</h3>{desc && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>}<div className="mt-auto flex items-center justify-between gap-2 border-b border-border pb-5 pt-5"><a href={productEnquiry(name)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta-deep"><MessageCircle size={16} /> Enquire</a><Button variant="ghost" onClick={() => toggle(name)} aria-pressed={selected} aria-label={`${selected ? "Remove" : "Add"} ${name} ${selected ? "from" : "to"} quote`} className="h-10 px-2 text-sm">{selected ? <Check /> : <Plus />}{selected ? "Added" : "Add to quote"}</Button></div></div></article>;
}
