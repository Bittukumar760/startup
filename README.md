# Olange AI — Coming Soon

A single-page "Coming Soon" landing page for **Olange AI** — an AI listing
studio for property dealers & brokers that turns empty rooms into sold
properties.

> Built from the Olange AI brochure. The _Furnished Rental Option_ feature is
> intentionally excluded. Visual design language is inspired by
> [fotello.co](https://fotello.co) — a calming blue → purple palette,
> gradients, large rounded cards and an interactive before/after staging
> slider.

## What's on the page

- **Hero** — headline, email notify form, hero trust badges, and an
  **interactive before/after AI-staging slider** (drag to compare an empty
  room with its staged version).
- **Trust strip + gradient stats band.**
- **The problem** — why empty/unfurnished flats are hard to sell.
- **Features** — 7 cards:
  AI Virtual Staging · Photo Enhancement · Marketplace Listing ·
  Auto-Generated Brochures · Per-Property WhatsApp Links ·
  Visit Scheduling & Alerts · Property Dashboard & CRM.
- **How it works** — 4 steps (upload → preview → brochure → share).
- **From enquiry to payment** — the end-to-end deal flow.
- **Transparent by design** — RERA-aligned disclosure notes.
- **Pricing** — ₹99 / property · ₹799 Starter (featured) · ₹2,499 Pro.
- **CTA + footer** — free-sample call to action.

The before/after illustrations live in `assets/room-before.svg` and
`assets/room-after.svg` — swap them for real listing photos when available.

## Files

| File          | Purpose                                   |
| ------------- | ----------------------------------------- |
| `index.html`  | Page markup                               |
| `styles.css`  | Styling (blue → purple Fotello-style)     |
| `assets/`     | Before/after room SVG illustrations       |
| `script.js`   | Before/after slider, notify form, reveal  |

## Run it

It's plain static HTML — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes

- The notify form stores emails in `localStorage` for now — wire it to a real
  backend / form service before launch.
- The before/after illustrations are placeholder SVGs; replace them with real
  empty-vs-staged listing photos for the strongest effect.
