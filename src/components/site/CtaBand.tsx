import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
export function CtaBand() {
 return <section className="bg-olive-deep text-warm"><div className="container-x flex flex-col justify-between gap-10 py-16 md:flex-row md:items-end md:py-24"><div><p className="eyebrow text-sand">Your next project</p><h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-6xl">Something worth<br />putting your name on.</h2><p className="mt-5 max-w-lg text-sand-soft">An idea, a launch, a team. Let’s find the right expression for your brand.</p></div><div className="flex flex-col items-start gap-4"><Button asChild className="btn btn-primary h-auto"><Link to="/quote">Start your project <ArrowUpRight /></Link></Button><a href={waLink("Hello IX Concepts, I'd like to discuss a merchandise project.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4"><MessageCircle size={18} /> Talk to us on WhatsApp</a></div></div></section>;
}
