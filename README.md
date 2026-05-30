# Olange AI — Coming Soon

A single-page "Coming Soon" landing page for **Olange AI** — an AI listing
studio for property dealers & brokers that turns empty rooms into sold
properties.

> Built from the Olange AI brochure. The _Furnished Rental Option_ feature is
> intentionally excluded.

## What's on the page

- **Hero** — tagline, "For Property Dealers & Brokers" badge, live launch
  countdown and an email notify form.
- **The problem** — why empty/unfurnished flats are hard to sell.
- **What Olange AI does** — 7 feature cards:
  AI Virtual Staging · Photo Enhancement · Marketplace Listing ·
  Auto-Generated Brochures · Per-Property WhatsApp Links ·
  Visit Scheduling & Alerts · Property Dashboard & CRM.
- **How it works** — 4 steps (upload → preview → brochure → share).
- **From enquiry to payment** — the end-to-end deal flow.
- **Built to preserve buyer trust** — RERA-aligned disclosure notes.
- **Pricing** — ₹99 / property · ₹799 Starter · ₹2,499 Pro.
- **CTA + footer** — free-sample call to action.

## Files

| File          | Purpose                                   |
| ------------- | ----------------------------------------- |
| `index.html`  | Page markup                               |
| `styles.css`  | Brand styling (orange + ink palette)      |
| `script.js`   | Countdown timer + notify form             |

## Run it

It's plain static HTML — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes

- The countdown defaults to **45 days** from first visit. To pin an exact
  launch date, set `LAUNCH_OVERRIDE` in `script.js`.
- The notify form stores emails in `localStorage` for now — wire it to a real
  backend / form service before launch.
