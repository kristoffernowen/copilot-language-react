# GitHub Pages deployment

Detta repo deployas via workflowen:

- `.github/workflows/deploy-pages.yml`

## Krävs i GitHub-repot

1. Gå till **Settings → Pages**.
2. Under **Source**, välj **GitHub Actions**.
3. Se till att default branch är `main` (eller uppdatera workflowens `on.push.branches` om du använder annan branch).

## Vite base path

`vite.config.ts` använder:

- `base: '/copilot-language-react/'`

Om du byter repos namn behöver du uppdatera denna path.
