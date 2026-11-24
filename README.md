# Resonance Technology website

The site builds static HTML for GitHub Pages. The shared stylesheet lives in `public/site.css`. Page content and the public project roster live in `src/seo/content.ts`.

```sh
nvm use
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

## Contact and release

**Hire AI Workers** opens the custom project inquiry at `/contact/`, which links to the hosted Youform project brief. Set `RSNC_CONTACT_EMAIL` to the verified public intake address to enable the email fallback. Use a GitHub Actions repository variable of the same name for deployment builds.

Before publishing, confirm that the fallback mailbox is monitored and that an approved test submission shows a receipt and reaches the intake owner. Keep the previous passing Pages deployment available for rollback. The [refresh plan](docs/website-refresh-plan.md) defines the usability, discovery, and performance checks.
