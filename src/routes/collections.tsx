import { createFileRoute } from "@tanstack/react-router";
import { COLLECTIONS } from "@/data/catalog";
import { PageHero } from "@/components/site/bits";
import { CollectionCard } from "@/components/site/CollectionCard";
import { CtaBand } from "@/components/site/CtaBand";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/collections")({ head: () => seo("Collections — Coordinated Brand Merchandise", "Explore coordinated apparel and merchandise concept collections for teams, events and everyday branding in Kampala."), component: Collections });
function Collections() { return <><PageHero eyebrow="The collections" title="A shared identity. In every detail." intro="A starting point for something entirely your own. Explore coordinated merchandise concepts, then let’s shape a collection around your brand." /><section className="container-x py-14 md:py-20"><div className="grid gap-x-8 gap-y-14 md:grid-cols-2">{COLLECTIONS.map(c => <CollectionCard key={c.slug} collection={c} />)}</div></section><CtaBand /></>; }
