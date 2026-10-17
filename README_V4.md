# SAVRENZA GROUP V4

The root site is a static, dependency-free HTML/CSS/JavaScript experience for Cloudflare Pages. Its editorial language distinguishes the group's current early-stage position from strategic interests and future ambitions.

## Local verification

- Serve the repository root with `npx.cmd wrangler pages dev . --ip 127.0.0.1 --port 4179`.
- Open `http://127.0.0.1:4179/` and test responsive widths, keyboard navigation, reduced-motion behavior, links and native contact-form validation.
- `scripts/check_assets.py` checks local HTML/CSS references. Node.js may be used to run equivalent checks where Python is unavailable.

## Enquiry form

The form validates in the browser and opens a prefilled email draft addressed to `info@savrenzaplatform.com`. The website does not submit or store enquiry data. Do not describe this as a backend, secure submission service or confirmed delivery.

## Language routing

`assets/locale-routes.json` is the route and direction registry. English is the only published locale. Bulgarian (`/bg/`), German (`/de/`) and Arabic (`/ar/`, RTL) remain planned until complete, reviewed translations and matching pages are ready. Do not expose a locale as published until that work is complete.

## Future assistant boundary

The site does not provide an AI assistant. Keep any future assistant as an isolated, opt-in feature with a same-origin server endpoint; secrets must remain in server-side Cloudflare bindings. Do not enable paid model calls, reuse an Energy-specific assistant prompt, or collect user data without explicit approval and a reviewed privacy/security design.

## Cloudflare Pages

The existing Git-connected Pages project reports its name as `savrezna-energy-ai-test` (not `savrenza-energy-ai-test`) and uses `main` as its production branch. Pushing this feature branch is expected to create a branch preview only; do not merge it or change the production branch without explicit approval. The available preview URL may require Cloudflare Access authorization.

This feature branch has not been pushed or deployed. Do not push it while deployment is on hold; pushing may trigger the Pages preview integration. The production branch and domains remain unchanged.
