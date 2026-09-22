# Amana Landing Page

Amana is a youthful peer-to-peer delivery landing page for turning trusted campus and interstate routes into secure, affordable parcel delivery.

The page is currently built as a dependency-free static prototype, so it can be opened directly in a browser or served with any basic static server.

## What It Includes

- A high-impact hero section with route matching preview
- A trust handshake section explaining OTP and escrow flow
- A sender/traveler persona toggle
- A live marketplace pulse ticker
- A USSD-first call to action: `*3844823#`
- Responsive styling for desktop and mobile

## Project Files

```text
.
|-- index.html    # Page structure and content
|-- styles.css    # Visual design, layout, and responsiveness
|-- script.js     # Interactions and live pulse behavior
|-- vercel.json   # Vercel routing fallback
`-- README.md
```

## Run Locally

Open `index.html` directly in your browser.

Or serve it locally:

```bash
python -m http.server 4173
```

Then visit:

```text
http://localhost:4173
```

## Deploying to Vercel

This project is a plain static site. In Vercel, make sure the project root is the folder that contains `index.html`.

Recommended settings:

- Framework Preset: `Other`
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: leave empty

The included `vercel.json` rewrites all routes back to `index.html`, preventing 404s on refreshes or custom URLs.

## Live Pulse Data

The ticker in `script.js` attempts to fetch live order data from:

```text
/api/orders
```

If that endpoint is not available, it falls back to demo marketplace updates so the landing page still feels active.
