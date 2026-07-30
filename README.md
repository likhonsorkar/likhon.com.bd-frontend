# LIKHON.COM.BD — React Site

A 4-page React site for LIKHON.COM.BD (Software Development & AI Solutions), built with
Vite + React Router. Every piece of text, the logo, nav, and all content is now driven
by a single JSON file that's fetched like a real API — see below.

## Pages
- **Home** (`/`) — Hero, Technologies, Team, Featured Projects, Testimonials, Contact form
- **Projects** (`/projects`) — Full project list with category filters
- **Project Details** (`/projects/:slug`) — Case study page (e.g. `/projects/shophub-ecommerce`)
- **Start a Project** (`/start-a-project`) — Project intake form with process steps

## The "JSON API" system
- All content lives in **`public/data.json`** — site title, logo, nav links, hero copy,
  stats, technologies, team, projects, testimonials, contact info, footer, everything.
- **`src/api/client.jsx`** exports `getSiteData()`, an async function that fetches that
  JSON file (with in-memory caching) — written the same way you'd call a real API.
- **`src/context/SiteDataContext.jsx`** calls `getSiteData()` once on load and shares
  the result with the whole app via a `useSiteData()` hook, with `loading` / `success` /
  `error` states (you'll see an animated loader while it fetches, and a retry screen if
  it fails).
- **When you're ready to go dynamic:** replace the `fetch('/data.json')` call inside
  `src/api/client.jsx` with a real endpoint (e.g. `fetch('https://api.likhon.com.bd/site')`).
  Nothing else in the app needs to change — every page already reads data through
  `useSiteData()` instead of hardcoded text.
- To edit content today: just edit `public/data.json` directly (no rebuild needed in dev
  — refresh the browser).

## Contact forms — WhatsApp / Email / SMS
There's no backend yet, so both the homepage contact form and the "Start a Project" form
give the visitor three ways to actually send their message, using the phone/email from
`data.json`:
- **Send via WhatsApp** → opens `wa.me` with the message pre-filled
- **Send via Email** → opens their email client (`mailto:`) with subject + body filled in
- **Send via SMS** → opens their SMS app (`sms:`) with the message pre-filled

Update the WhatsApp number and email in `public/data.json` under `"contact"`.

## Design & UX
- New logo (`public/assets/logo.png`) is used everywhere: navbar, footer, favicon, hero.
- Scroll-reveal animations (fade + slide up) on every section, staggered per item, via
  a lightweight `useReveal` hook (no animation library needed).
- Stat numbers (50+, 30+, 5+, 100%) count up when they scroll into view.
- Hero has animated gradient blobs, a subtle grid background, and floating tech icons.
- Mobile menu is a slide-in panel from the right with a backdrop, body-scroll lock, and
  staggered link entrance — tested down to small phone widths.

## Running locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Building for production

```bash
npm run build
```

This outputs a static `dist/` folder (with `data.json` and `assets/` copied in) that you
can deploy to Netlify, Vercel, GitHub Pages, or any static host / your own server.

## Content you'll want to edit
- `public/data.json` — everything: site title/logo, nav, hero, stats, technologies, team,
  projects, testimonials, contact info, and the Start a Project page copy.
- Team photos, tech logos, and screenshots live in `public/assets/`.
- Colors, fonts, and spacing are all controlled by CSS variables at the top of
  `src/index.css`.

## Notes
- Only the ShopHub project (`shophub-ecommerce`) has full case-study data
  (features, results, testimonial) filled in — copy that structure in `data.json`
  for your other projects as you get real case-study details.
- Team members were mapped from the photos you uploaded: MD Likhon Sorkar,
  Ashraful Ahsan, Imran Hosen, and Jahidul Islam Jannat. Update names/roles/stack
  in `public/data.json` if anything needs correcting.
"# likhon.com.bd-frontend" 
