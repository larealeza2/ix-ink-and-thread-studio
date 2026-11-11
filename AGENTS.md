<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Business/contact details and the WhatsApp number live only in src/config/site.ts so contact channels remain consistent.
- Catalog, services and gallery data live in src/data/catalog.ts so demo images can be swapped for approved photos in one place.
- No backend, cart or payments: enquiries go to WhatsApp via src/lib/whatsapp.ts (covered by whatsapp.test.ts).
- Brand colours are --brand-* tokens in src/styles.css; components use semantic utilities (btn-primary, text-espresso, etc.), never raw colours.

- Keep collection and portfolio detail routes unnested from their listing pages so full-page case studies render independently.
- Keep quote selection in the shared QuoteBasket provider and validate quote details in src/lib/quote-schema.ts; both feed the existing WhatsApp handoff without checkout.
- Store collection manifests and case-study narratives with the central catalog to keep the included products consistent across pages and enquiries.
- Render the shared closing invitation from components/site/CtaBand rather than importing a route component across pages.
