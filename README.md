# Ékié Website

Public-facing website for [myekie.com](https://myekie.com) — Cameroonian platform for Akao contributions, marketplace, bookings, school fees and Njangi circles.

## Tech stack
- **Next.js 15** (App Router) + React 19
- **TypeScript**
- **Tailwind CSS**
- **Inter** + **Playfair Display** fonts
- Forms via **Formsubmit.co** → emails to `hello@myekie.com`
- API: `https://api.myekie.com` (for `/store/[id]` dynamic pages)
- Deploys to **Vercel**

## Pages
- `/` — Homepage with hero, services, business, founder, how-it-works, vendor application, contact, CTA
- `/store/[id]` — Dynamic store landing page (for shared store links)
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/cookies` — Cookie Policy
- `/security` — Security & disclosure

## Languages
English (default) + French — toggle in nav. Language preference is stored in localStorage.

---

## 🚀 First-time setup

### 1. Install dependencies

```bash
cd ~/ekie-website
npm install
```

### 2. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

### 3. Push to GitHub

```bash
git init
git add -A
git commit -m "Initial commit: Ékié website"
git branch -M main
git remote add origin https://github.com/Fabiola2025/ekie-website.git
git push -u origin main
```

You'll need to create the empty repo `ekie-website` on github.com first.

### 4. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Fabiola2025/ekie-website`
3. Click **Deploy**
4. Vercel auto-detects Next.js and deploys

Site goes live at `ekie-website.vercel.app` within ~60 seconds.

### 5. Custom domain (later)

In Vercel project settings → Domains → add `myekie.com`. Vercel will tell you which DNS records to add in AWS Route 53.

---

## Updating content

**Text/translations** → edit `lib/i18n.ts`. Both English and French live in this one file.

**Homepage layout** → `app/page.tsx`.

**Store landing page** → `app/store/[id]/page.tsx`. Pulls live from `https://api.myekie.com/api/service-providers/detail/{id}`.

**Add screenshots/founder photo** → drop images into `public/` and reference like `<img src="/founder.jpg" />`. Replace the `É` placeholder in `app/page.tsx` founder section.

**Update emails** → search for `hello@myekie.com` in `components/Forms.tsx` and `lib/i18n.ts`.

---

## Architecture notes

- All forms submit to formsubmit.co/ajax/hello@myekie.com — no backend needed
- Store page calls public endpoint `/api/service-providers/detail/{id}` — no auth required
- Deep link `ekie://store/{id}` opens the Ékié app if installed (to be configured later in the mobile app's deep linking config)
- App Store / Play Store URLs are placeholders until you publish; update them in `app/store/[id]/page.tsx`

---

## License
© 2026 Ékié. All rights reserved.
