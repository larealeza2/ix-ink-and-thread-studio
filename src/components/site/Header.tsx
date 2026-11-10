import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV, SITE } from "@/config/site";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/whatsapp";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-baseline gap-1.5 font-display ${light ? "text-warm" : "text-espresso"}`}>
      <span className="text-2xl font-extrabold ">IX</span>
      <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden />
      <span className="text-sm font-semibold ">Concepts</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled || open ? "border-b border-border bg-background/95 backdrop-blur" : "bg-background"}`}>
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" aria-label={`${SITE.name} home`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  className="group relative py-2 text-sm font-medium text-espresso"
                  activeProps={{ "data-active": "true" } as never}
                >
                  {n.label}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-terracotta transition-transform duration-500 group-hover:scale-x-100 group-data-[active=true]:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="btn btn-secondary hidden !min-h-11 !px-4 xl:inline-flex">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <Link to="/quote" className="btn btn-primary hidden !min-h-11 sm:inline-flex">Request a Quote</Link>
          <Button variant="ghost"
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-espresso lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="anim-rise h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <ul className="container-x flex flex-col py-6">
            {NAV.map((n) => (
              <li key={n.to} className="border-b border-border">
                <Link to={n.to} activeOptions={{ exact: n.to === "/" }} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl font-bold text-espresso" activeProps={{ className: "text-terracotta-deep" }}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="mt-6 flex flex-col gap-3">
              <Link to="/quote" onClick={() => setOpen(false)} className="btn btn-primary w-full">Request a Quote</Link>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
