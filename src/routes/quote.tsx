import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { quoteSchema as schema } from "@/lib/quote-schema";
import { Button } from "@/components/ui/button";
import { MessageCircle, Pencil, Copy, Info, Loader2 } from "lucide-react";
import { buildQuoteMessage, waLink, QUOTE_LABELS, type QuoteData } from "@/lib/whatsapp";
import { PRODUCTS, SERVICES, collectionBySlug } from "@/data/catalog";
import { SITE } from "@/config/site";
import { PageHero } from "@/components/site/bits";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/quote")({
  validateSearch: (s: Record<string, unknown>): { product?: string; collection?: string; items?: string } => ({
    ...(typeof s["product"] === "string" ? { product: s["product"].slice(0,120) } : {}),
    ...(typeof s["collection"] === "string" ? { collection: s["collection"].slice(0,120) } : {}),
    ...(typeof s["items"] === "string" ? { items: s["items"].slice(0,3000) } : {}),
  }),
  head: () => seo("Request a Quote on WhatsApp", "Request a quote for custom T-shirts, corporate wear, embroidery or promotional merchandise in Kampala. Your enquiry opens in WhatsApp."),
  component: Quote,
});

const OPTIONS = Array.from(new Set([...SERVICES.map((s) => s.title), ...PRODUCTS.map((p) => p.name), "Other"]));
const EMPTY: QuoteData = { name: "", phone: "", product: "", quantity: "", colours: "", design: "", date: "", notes: "", items: "" };
const KEY = "ix-quote-draft";

function F({ k, req, err, children }: { k: keyof QuoteData; req?: boolean; err?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`f-${k}`} className="mb-2 block text-sm font-semibold text-espresso">{QUOTE_LABELS[k]}{req && <span className="text-terracotta-deep"> *</span>}</label>
      {children}
      {err && <p id={`e-${k}`} role="alert" className="mt-1.5 text-sm text-destructive">{err}</p>}
    </div>
  );
}

function Quote() {
  const { product, collection, items } = Route.useSearch();
  const selectedCollection = collection ? collectionBySlug(collection) : undefined;
  const [data, setData] = useState<QuoteData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteData, string>>>({});
  const [step, setStep] = useState<"form" | "review" | "sent">("form");
  const [busy, setBusy] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const [restored, setRestored] = useState(false);
  useEffect(() => {
    let saved: Partial<QuoteData> = {};
    try {
      const value: unknown = JSON.parse(localStorage.getItem(KEY) || "null");
      if (value && typeof value === "object") {
        for (const key of Object.keys(EMPTY) as (keyof QuoteData)[]) {
          const field = (value as Record<string, unknown>)[key];
          if (typeof field === "string") saved[key] = field;
        }
      }
    } catch { /* A new draft remains usable when storage is unavailable. */ }
    const incoming = selectedCollection?.products ?? items?.split("|").filter(Boolean);
    setData({ ...EMPTY, ...saved,
      ...(product ? { product } : {}),
      ...(incoming?.length ? { product: selectedCollection?.name ?? incoming[0] ?? "", items: incoming.join("\n") } : {}),
      ...(selectedCollection ? { design: `Adapt the ${selectedCollection.brand} / ${selectedCollection.name} concept to my brand.` } : {}),
    });
    setRestored(true);
  }, [product, collection, items]);
  useEffect(() => {
    if (!restored) return;
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* Keep entered details in memory. */ }
  }, [data, restored]);

  const set = (k: keyof QuoteData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const review = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof QuoteData] = i.message));
      setErrors(errs);
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const message = buildQuoteMessage(data);
  const url = waLink(message);

  const send = () => {
    setBusy(true);
    const w = window.open(url, "_blank");
    if (w) w.opener = null;
    setTimeout(() => {
      setBusy(false);
      setBlocked(!w);
      setStep("sent");
    }, 500);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); }
  };

  const a = (k: keyof QuoteData) => ({ id: `f-${k}`, value: data[k] ?? "", onChange: set(k), "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined, className: "field" });

  return (
    <>
      <PageHero eyebrow="Request a quote" title="Tell us what you need." intro="A single piece or a complete collection. Tell us what you have in mind and we’ll start a conversation." />
      <section className="container-x py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <ol className="mb-10 flex gap-2 text-sm font-semibold" aria-label="Progress">
            {["Details", "Review", "Send"].map((s, i) => {
              const cur = ["form", "review", "sent"].indexOf(step);
              return <li key={s} aria-current={cur === i ? "step" : undefined} className={`flex-1 border-t-2 pt-3 transition-colors ${cur >= i ? "border-terracotta text-espresso" : "border-border text-muted-foreground"}`}>{i + 1}. {s}</li>;
            })}
          </ol>

          {step === "form" && (
            <form onSubmit={review} noValidate className="grid gap-6 md:grid-cols-2">
              <F k="name" err={errors.name} req><input {...a("name")} autoComplete="name" maxLength={100} /></F>
              <F k="phone" err={errors.phone}><input {...a("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+256 …" maxLength={20} /></F>
              <F k="product" err={errors.product} req>
                <select {...a("product")}>
                  <option value="">Select…</option>
                  {[...(data.product && !OPTIONS.includes(data.product) ? [data.product] : []), ...OPTIONS].map((o) => <option key={o}>{o}</option>)}
                </select>
              </F>
              <F k="quantity" err={errors.quantity}><input {...a("quantity")} inputMode="numeric" placeholder="e.g. 50, or not yet decided" maxLength={40} /></F>
              <div className="md:col-span-2"><fieldset className="border-y border-border py-6"><legend className="px-2 text-sm font-semibold">Products in your project</legend><div className="grid gap-3 sm:grid-cols-2">{PRODUCTS.map(p => {
                const selected = (data.items ?? "").split("\n").filter(Boolean);
                return <label key={p.name} className="flex items-center gap-3 text-sm"><input type="checkbox" className="h-4 w-4 accent-primary" checked={selected.includes(p.name)} onChange={() => setData(d => ({ ...d, items: (selected.includes(p.name) ? selected.filter(n => n !== p.name) : [...selected,p.name]).join("\n"), product: d.product || p.name }))} />{p.name}</label>;
              })}</div>{data.items && <p className="mt-5 whitespace-pre-line text-sm text-muted-foreground">{data.items}</p>}</fieldset></div>
              <F k="colours" err={errors.colours}><input {...a("colours")} placeholder="e.g. Olive shirts, white logo" maxLength={200} /></F>
              <F k="date" err={errors.date}><input {...a("date")} type="date" /></F>
              <div className="md:col-span-2"><F k="design" err={errors.design}><textarea {...a("design")} rows={3} placeholder="Your brand, intended use, logo placement and artwork requirements" maxLength={600} /></F></div>
              <div className="md:col-span-2"><F k="notes" err={errors.notes}><textarea {...a("notes")} rows={3} maxLength={1000} /></F></div>
              <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">* Required. Quantity and phone are optional. Artwork and reference files can be shared in WhatsApp.</p>
                <Button type="submit" className="btn btn-primary">Review enquiry</Button>
              </div>
            </form>
          )}

          {step !== "form" && (
            <div className="anim-rise">
              <dl className="divide-y divide-border rounded border border-border bg-card">
                {(Object.keys(QUOTE_LABELS) as (keyof QuoteData)[]).filter((k) => data[k]?.trim()).map((k) => (
                  <div key={k} className="grid gap-1 p-5 sm:grid-cols-[14rem_1fr]">
                    <dt className="text-sm font-semibold text-muted-foreground">{QUOTE_LABELS[k]}</dt>
                    <dd className="whitespace-pre-wrap break-words text-espresso">{data[k]}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex gap-3 rounded bg-sand-soft p-5 text-sm text-espresso" role="note">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-olive-deep" />
                <p>WhatsApp will open with your message ready. <strong>You must press Send in WhatsApp</strong> to submit your enquiry.</p>
              </div>
              {step === "sent" && (
                <div role="status" className="mt-6 rounded border border-terracotta p-5 text-sm text-espresso">
                  {blocked ? <p><strong>WhatsApp didn't open.</strong> Use the link below, or copy your message and send it to {SITE.phoneDisplay}.</p>
                    : <p>Did WhatsApp not open? Use the link below or copy your message. Remember to press Send.</p>}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp !min-h-11">Open WhatsApp</a>
                    <Button variant="ghost" type="button" onClick={copy} className="btn btn-secondary !min-h-11"><Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy message"}</Button>
                    <Button variant="ghost" type="button" onClick={() => { try { localStorage.removeItem(KEY); } catch {} setData({ ...EMPTY }); setStep("form"); }} className="btn !min-h-11 text-muted-foreground underline">Start a new enquiry</Button>
                  </div>
                </div>
              )}
              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button variant="ghost" type="button" onClick={() => setStep("form")} className="btn btn-secondary"><Pencil className="h-4 w-4" /> Edit details</Button>
                <Button variant="ghost" type="button" onClick={send} disabled={busy} className="btn btn-whatsapp">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />} Send Enquiry on WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
