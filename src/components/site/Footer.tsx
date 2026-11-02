import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="bg-espresso text-warm">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-soft">{SITE.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow text-sand">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="link-underline text-warm/90 hover:text-warm">{n.label}</Link></li>
            ))}
            <li><Link to="/story" className="link-underline text-warm/90">Story & Achievements</Link></li>
            <li><Link to="/quote" className="link-underline text-warm/90">Request a Quote</Link></li>
          </ul>
        </nav>
        <div>
          <p className="eyebrow text-sand">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`tel:${SITE.phoneTel}`} className="link-underline">{SITE.phoneDisplay}</a></li>
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="link-underline">WhatsApp us</a></li>
            {SITE.email && <li><a href={`mailto:${SITE.email}`} className="link-underline">{SITE.email}</a></li>}
            <li className="text-sand-soft">{SITE.address ?? SITE.city}</li>
            {SITE.social.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="link-underline">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-warm/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-sand-soft/80 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Printing · Embroidery · Custom Apparel · Kampala</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(`Hello ${SITE.shortName}, I'd like to make an enquiry.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="anim-pulse fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-warm transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.7 2.2 13.9 2.2 12 2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
      </svg>
    </a>
  );
}
