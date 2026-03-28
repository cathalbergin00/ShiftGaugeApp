# ShiftGauge Pages

Static marketing site for ShiftGauge, deployed via GitHub Pages.

## Site files

- `index.html`: main landing page
- `privacy.html`: privacy policy page
- `support.html`: support/help page
- `styles.css`: shared styling across all pages
- `script.js`: lightbox, mobile nav, CTA tracking behavior
- `robots.txt`: crawler policy
- `sitemap.xml`: crawl discovery index
- `CNAME`: custom domain (`shiftgauge.app`)

## Assets

- `assets/screenshots/`: landing screenshots
- `assets/screenshots/hero-pay-period-mobile.png`: mobile-only hero source image
- `assets/brand/app-icon-1024.png`: app icon used for brand mark and favicon/touch icon

## Updating screenshots

1. Replace files in `assets/screenshots/`.
2. Update corresponding `src` and `data-full` values in `index.html`.
3. Preserve accurate `alt` text and outcome-focused captions.

## Updating resources

- Privacy link points to `privacy.html`.
- Support link points to `support.html`.
- App Store CTA links point to:
  `https://apps.apple.com/us/app/shiftgauge-ot-pay-tracker/id6761068149`

## Local preview

Run from repo root:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment (GitHub Pages)

Deploy from branch:

1. GitHub repo -> Settings -> Pages
2. Source: `Deploy from a branch`
3. Branch: `main`
4. Folder: `/ (root)`

Custom domain is configured through `CNAME` as `shiftgauge.app`.
