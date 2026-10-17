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

The new homepage does not expose an AI assistant. The repository retains its legacy `/api/chat` worker endpoint; it is gated by server-side configuration and must not be enabled or represented as a SAVRENZA GROUP capability without explicit approval and a reviewed privacy/security design. Any future assistant should be isolated, opt-in and same-origin, with secrets kept in server-side Cloudflare bindings.

## Cloudflare Pages

The existing Git-connected Pages project reports its name as `savrezna-energy-ai-test` (not `savrenza-energy-ai-test`), uses `main` as its production branch, and is currently associated with `energy.savrenzaplatform.com` and `savrenzaplatform.com`. A push to this feature branch is intended to create a branch preview; a push to `main` can replace production. Verify the preview before promoting changes. Do not edit DNS or domain bindings as part of a site release. A preview may be protected by Cloudflare Access.
