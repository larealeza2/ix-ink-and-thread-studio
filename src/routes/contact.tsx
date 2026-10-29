import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, Clock, Share2 } from "lucide-react";
import type { ReactNode } from "react";
import { SITE } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/site/bits";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Us", "Call or WhatsApp IX Concepts Limited in Kampala for custom apparel, corporate wear, embroidery and promotional merchandise."),
  component: Contact,
});

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 border-b border-border py-6">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-olive/15 text-olive-deep">{icon}</span>
      <div>
        <p className="eyebrow text-muted-foreground">{label}</p>
        <div className="mt-1.5 text-lg font-semibold text-espresso">{children}</div>
      </div>
    </div>
  );
}
const TBC = ({ t }: { t: string }) => <span className="text-base font-normal italic text-muted-foreground">{t}</span>;

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk." intro="The fastest way to reach us is WhatsApp. Send your idea, artwork or questions and we'll get back to you." />
      <section className="container-x grid gap-12 py-14 md:grid-cols-[1.3fr_1fr] md:py-24">
        <Reveal>
          <Row icon={<Phone className="h-5 w-5" />} label="Telephone"><a href={`tel:${SITE.phoneTel}`} className="link-underline">{SITE.phoneDisplay}</a></Row>
          <Row icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp"><a href={waLink()} target="_blank" rel="noopener noreferrer" className="link-underline">{SITE.phoneDisplay}</a></Row>
          <Row icon={<Mail className="h-5 w-5" />} label="Email">{SITE.email ? <a href={`mailto:${SITE.email}`} className="link-underline">{SITE.email}</a> : <TBC t="Email address to be confirmed" />}</Row>
          <Row icon={<MapPin className="h-5 w-5" />} label="Address">
            {SITE.address ? <>{SITE.address}{SITE.mapsUrl && <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-1 block text-base text-terracotta-deep">Get directions</a>}</> : <TBC t={`${SITE.city} — exact address to be confirmed`} />}
          </Row>
          <Row icon={<Clock className="h-5 w-5" />} label="Opening hours">{SITE.openingHours ?? <TBC t="Opening hours to be confirmed" />}</Row>
          <Row icon={<Share2 className="h-5 w-5" />} label="Social media">
            {SITE.social.length ? SITE.social.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="link-underline mr-4">{s.label}</a>) : <TBC t="Social profiles to be confirmed" />}
          </Row>
        </Reveal>
        <Reveal delay={120} className="self-start rounded-2xl bg-espresso p-8 text-warm md:p-10">
          <h2 className="text-3xl font-extrabold">Ready for a quote?</h2>
          <p className="mt-3 text-sand-soft">Fill in a short form and send it straight to our WhatsApp.</p>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/quote" className="btn btn-primary">Request a Quote</Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-light"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
          </div>
          <p className="mt-6 text-xs text-sand-soft/80">Contact number listed for demo purposes and pending confirmation by the business.</p>
        </Reveal>
      </section>
    </>
  );
}
