# SAVRENZA ENERGY — GitHub setup

1. Create a **private** GitHub repository (e.g. `savrenza-energy-site`).
2. Upload the contents of this archive into the repository root (not the ZIP itself).
3. Open **Actions**: `Website checks` runs after each push and every Monday.
4. In repository **Settings → Secrets and variables → Actions**, create `CLOUDFLARE_API_TOKEN` (scoped to Pages edit) and `CLOUDFLARE_ACCOUNT_ID`. Never share these secrets in chat.
5. In **Settings → Environments**, create `production`, configure required reviewers if supported by your plan, and restrict branches as appropriate.
6. To deploy: **Actions → Deploy to Cloudflare (manual approval) → Run workflow**. This does NOT deploy automatically on every change.

Note: The checks only verify local asset links; they do not certify translations, currency exchange rates, legal compliance, or visual mobile layout. The current website code is V19 and remains unmodified. No unattended AI review is active. Cloudflare credentials and initial setup require your action.
