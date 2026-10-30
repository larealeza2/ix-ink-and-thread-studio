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
- Business/contact details and the WhatsApp number live only in src/config/site.ts; unverified values stay null so the UI shows "to be confirmed" instead of invented facts.
- Catalog, services and gallery data live in src/data/catalog.ts so demo images can be swapped for approved photos in one place.
- No backend, cart or payments: enquiries go to WhatsApp via src/lib/whatsapp.ts (covered by whatsapp.test.ts).
- Brand colours are --brand-* tokens in src/styles.css; components use semantic utilities (btn-primary, text-espresso, etc.), never raw colours.
