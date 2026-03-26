# ShiftGaugeApp Pages

Static marketing landing page for ShiftGauge, optimized for GitHub Pages.

## Files

- `index.html`: page structure, copy, metadata, and placeholder tokens
- `styles.css`: responsive styling and visual system
- `script.js`: lightweight screenshot lightbox behavior

## Placeholder tokens to update

Edit `index.html` and replace:

- `{{APP_STORE_URL}}`
- `{{GIST_PRIVACY_URL}}`
- `{{GIST_SUPPORT_URL}}`
- `{{SCREENSHOT_1}}` ... `{{SCREENSHOT_6}}` (or extend to more)

## Updating screenshots

1. Add image files to the repo (for example in `assets/screenshots/`).
2. Update each `src` and `data-full` value in the screenshot gallery in `index.html`.
3. Keep meaningful `alt` text and user-outcome captions for accessibility and conversion clarity.

## Local preview

From the repo root, run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment (GitHub Pages)

This repo is intended to deploy directly from `main` root.

1. GitHub repo -> Settings -> Pages
2. Source: `Deploy from a branch`
3. Branch: `main`
4. Folder: `/ (root)`

Pushes to `main` will trigger a new Pages deployment.
