# SAVRENZA ENERGY V30 — пълен GitHub пакет

Този пакет използва файловете от предоставения V30 архив, включително `assets/`. Запазен е и `.github/workflows/main.yml` от текущо предоставения GitHub архив. Добавена е проверка на локалните HTML/CSS ресурси.

## Качване

1. Архивирай/запази старото GitHub съдържание или създай нов клон преди замяна.
2. Качи **съдържанието** на този ZIP в корена на GitHub хранилището (`main`), а не ZIP файла като единичен файл.
3. Провери GitHub Actions → **Verify static assets**; тя проверява файловете, **не** публикува проекта.
4. Ако Cloudflare Pages е свързан чрез Git integration, виж към кой branch, root и project е настроен. Ако проектът е Direct Upload, направи отделен Cloudflare Pages deployment със съдържанието на този архив към правилния проект; не предполагай, че GitHub push е достатъчен.
5. Първо използвай preview/test deployment, провери телефон и компютър, след което production.
6. Провери `https://energy.savrenzaplatform.com/version.json` и началната страница, по възможност в private/incognito tab. При старо съдържание провери domain binding, активния Cloudflare deployment и cache, преди Purge Everything.

## Ограничения

Няма осъществено live публикуване, нито потвърдена функционална браузърна проверка. Live AI зависи от конфигурацията на backend/Cloudflare secrets. Не съхранявай ключове в GitHub.
