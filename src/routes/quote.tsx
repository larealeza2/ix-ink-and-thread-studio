import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MessageCircle, Pencil, Copy, Info, Loader2 } from "lucide-react";
import { buildQuoteMessage, waLink, QUOTE_LABELS, type QuoteData } from "@/lib/whatsapp";
import { PRODUCTS, SERVICES } from "@/data/catalog";
import { PageHero } from "@/components/site/bits";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/quote")({
  validateSearch: (s: Record<string, unknown>): { product?: string } =>
    typeof s.product === "string" ? { product: s.product.slice(0, 120) } : {},
  head: () => seo("Request a Quote on WhatsApp", "Request a quote for custom T-shirts, corporate wear, embroidery or promotional merchandise in Kampala. Your enquiry opens in WhatsApp."),
  component: Quote,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number"),
  product: z.string().trim().min(1, "Please choose a product or service").max(120),
  quantity: z.string().trim().min(1, "Please enter a quantity").max(40),
  colours: z.string().trim().max(200).optional(),
  design: z.string().trim().max(600).optional(),
  date: z.string().trim().max(40).optional(),
  notes: z.string().trim().max(1000).optional(),
});

const OPTIONS = Array.from(new Set([...SERVICES.map((s) => s.title), ...PRODUCTS.map((p) => p.name), "Other"]));
const EMPTY: QuoteData = { name: "", phone: "", product: "", quantity: "", colours: "", design: "", date: "", notes: "" };
const KEY = "ix-quote-draft";

function Quote() {
  const { product } = Route.useSearch();
  const [data, setData] = useState<QuoteData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteData, string>>>({});
  const [step, setStep] = useState<"form" | "review" | "sent">("form");
  const [busy, setBusy] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Restore draft so entered info is never silently lost.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      setData({ ...EMPTY, ...(saved || {}), ...(product ? { product } : {}) });
    } catch {
      if (product) setData((d) => ({ ...d, product }));
    }
  }, [product]);
  useEffect(() => {
    if (data !== EMPTY) localStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

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
    const w = window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setBusy(false);
      setBlocked(!w);
      setStep("sent");
    }, 500);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); }
  };

  const F = ({ k, req, children }: { k: keyof QuoteData; req?: boolean; children: React.ReactNode }) => (
    <div>
      <label htmlFor={`f-${k}`} className="mb-2 block text-sm font-semibold text-espresso">{QUOTE_LABELS[k]}{req && <span className="text-terracotta-deep"> *</span>}</label>
      {children}
      {errors[k] && <p id={`e-${k}`} role="alert" className="mt-1.5 text-sm text-destructive">{errors[k]}</p>}
    </div>
  );
  const a = (k: keyof QuoteData) => ({ id: `f-${k}`, value: data[k] ?? "", onChange: set(k), "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined, className: "field" });

  return (
    <>
      <PageHero eyebrow="Request a quote" title="Tell us what you need." intro="Complete the form, review your details, then send them to us on WhatsApp." />
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
              <F k="name" req><input {...a("name")} autoComplete="name" maxLength={100} /></F>
              <F k="phone" req><input {...a("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+256 …" maxLength={20} /></F>
              <F k="product" req>
                <select {...a("product")}>
                  <option value="">Select…</option>
                  {[...(data.product && !OPTIONS.includes(data.product) ? [data.product] : []), ...OPTIONS].map((o) => <option key={o}>{o}</option>)}
                </select>
              </F>
              <F k="quantity" req><input {...a("quantity")} inputMode="numeric" placeholder="e.g. 50" maxLength={40} /></F>
              <F k="colours"><input {...a("colours")} placeholder="e.g. Olive shirts, white logo" maxLength={200} /></F>
              <F k="date"><input {...a("date")} type="date" /></F>
              <div className="md:col-span-2"><F k="design"><textarea {...a("design")} rows={3} placeholder="Logo placement, print or embroidery, artwork ready?" maxLength={600} /></F></div>
              <div className="md:col-span-2"><F k="notes"><textarea {...a("notes")} rows={3} maxLength={1000} /></F></div>
              <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">* Required. Your entries are saved on this device until sent.</p>
                <button type="submit" className="btn btn-primary">Review enquiry</button>
              </div>
            </form>
          )}

          {step !== "form" && (
            <div className="anim-rise">
              <dl className="divide-y divide-border rounded-2xl border border-border bg-card">
                {(Object.keys(QUOTE_LABELS) as (keyof QuoteData)[]).filter((k) => data[k]?.trim()).map((k) => (
                  <div key={k} className="grid gap-1 p-5 sm:grid-cols-[14rem_1fr]">
                    <dt className="text-sm font-semibold text-muted-foreground">{QUOTE_LABELS[k]}</dt>
                    <dd className="whitespace-pre-wrap break-words text-espresso">{data[k]}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex gap-3 rounded-2xl bg-sand-soft p-5 text-sm text-espresso" role="note">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-olive-deep" />
                <p>WhatsApp will open with your message ready. <strong>You must press Send in WhatsApp</strong> to submit your enquiry.</p>
              </div>
              {step === "sent" && (
                <div role="status" className="mt-6 rounded-2xl border border-terracotta p-5 text-sm text-espresso">
                  {blocked ? <p><strong>WhatsApp didn't open.</strong> Use the link below, or copy your message and send it to {`+${"256759606713".replace(/^(\d{3})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4")}`}.</p>
                    : <p>Did WhatsApp not open? Use the link below or copy your message. Remember to press Send.</p>}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp !min-h-11">Open WhatsApp</a>
                    <button type="button" onClick={copy} className="btn btn-secondary !min-h-11"><Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy message"}</button>
                    <button type="button" onClick={() => { localStorage.removeItem(KEY); setData(EMPTY); setStep("form"); }} className="btn !min-h-11 text-muted-foreground underline">Start a new enquiry</button>
                  </div>
                </div>
              )}
              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={() => setStep("form")} className="btn btn-secondary"><Pencil className="h-4 w-4" /> Edit details</button>
                <button type="button" onClick={send} disabled={busy} className="btn btn-whatsapp">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />} Send Enquiry on WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
