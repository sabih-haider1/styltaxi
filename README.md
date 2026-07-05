# StylTaxi — Premium Taxi & Airport Transfers (Barcelona)

React (Vite) + TailwindCSS 4 + Framer Motion + React Hook Form + Zod + React Router + react-i18next.
No backend: bookings and contact messages are delivered by email through FormSubmit.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Configuration (.env)

Copy `.env.example` to `.env`:

| Variable | Purpose |
|---|---|
| `VITE_GOOGLE_MAPS_API_KEY` | Enables Places Autocomplete + live route preview in the booking wizard. Without it the wizard still works with plain text inputs and a static route card. Enable **Maps JavaScript API**, **Places API** and **Directions API** for the key, and restrict it to your domain. |
| `VITE_BOOKING_EMAIL` | Where bookings/contact messages are delivered (via formsubmit.co). The **first submission** triggers a one-time activation email from FormSubmit — click the link in it once. |
| `VITE_PHONE` / `VITE_WHATSAPP` | Public phone number and WhatsApp number (digits only, with country code). |

Values are baked in at build time — re-run `npm run build` after changing them.

## Languages

English, Spanish and Catalan. All copy lives in `src/i18n/locales/{en,es,ca}.json` —
edit those files to change any text; never hardcode strings in components.

## Images

All images live in `public/images/`. To replace a photo, overwrite the `.jpg` **and**
its `-sm.jpg` mobile variant (same name + `-sm`, ~700px wide). The hero also has
`hero-800.jpg` / `hero-1400.jpg` sizes. If a `-sm` file is missing the site still
works (falls back to a branded gradient on error), but keep the variants for
mobile speed.

## Deployment (SPA routing — avoids 404s on deep links)

The app is a single-page app; the server must serve `index.html` for every route.
Config for the common hosts is already included:

- **Netlify** — `public/_redirects` (copied into `dist/`), nothing to do.
- **Vercel** — `vercel.json`, nothing to do.
- **Apache / cPanel shared hosting** — `public/.htaccess` (copied into `dist/`); upload the *contents* of `dist/` to `public_html`.
- **Nginx** — add `try_files $uri $uri/ /index.html;` to the location block.

Deploy = `npm run build`, then upload the `dist/` folder.
