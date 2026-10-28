# IT Fragrance — Production Deployment Guide

This document contains step-by-step instructions to export, run, and host the **IT Fragrance** website outside Google AI Studio on free, production-ready hosting platforms (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

---

## 1. How to Export / Download Your Source Code

In Google AI Studio Build:
1. Click the **Export / Download** button in the top right menu bar (or click the three dots `...` next to the project title and select **"Export to GitHub"** or **"Download ZIP"**).
2. If connecting to GitHub: Authorize your GitHub account to create a private or public repository (e.g. `it-fragrance-website`).
3. If downloading as a ZIP: Extract the folder on your computer.

The complete project structure includes:
```
├── index.html              # HTML entry point with fonts & metadata
├── package.json            # Scripts and dependencies (React 19, Tailwind, Vite)
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── public/                 # Static assets (copied directly to production root)
│   └── images/             # All luxury perfume bottle images & hero banners
│       ├── hero_it_fragrance.jpg
│       ├── perfume_it_oud.jpg
│       ├── perfume_it_bloom.jpg
│       ├── perfume_it_noir.jpg
│       └── perfume_it_amber.jpg
└── src/
    ├── App.tsx             # Main store container and state
    ├── index.css           # Tailwind v4 luxury styling & theme variables
    ├── main.tsx            # React application root
    ├── data/
    │   └── perfumes.ts     # Perfume catalog, olfactory pyramid notes & WhatsApp number
    ├── types/
    │   └── cart.ts         # Cart logic & polite WhatsApp order message generator
    └── components/
        ├── Header.tsx      # Top bar navigation & cart trigger
        ├── Hero.tsx        # Campaign focal hero with value props
        ├── ProductCard.tsx # Bottle size selector, price, and instant order
        ├── ProductDetailModal.tsx # Olfactory pyramid & longevity specs
        ├── ScentFinder.tsx # Interactive 3-step consultation quiz
        ├── CartDrawer.tsx  # Slide-over checkout drawer & WhatsApp order builder
        ├── StorySection.tsx# 60-day dark-chamber maceration story
        ├── Testimonials.tsx# Attributable Pakistani customer reviews
        └── Footer.tsx      # Atelier contact details & WhatsApp hotline
```

---

## 2. Option A: 100% Free Hosting on Vercel (Recommended — 2 Minutes)

Vercel provides free global CDN hosting, automatic SSL certificates, and zero configuration for Vite apps.

### Method 1: Via GitHub (Continuous Deployment)
1. Push your project to a GitHub repository (e.g. `github.com/your-username/it-fragrance`).
2. Go to **[vercel.com](https://vercel.com)** and sign in with your GitHub account (Free Hobby Plan).
3. Click **"Add New..."** → **"Project"**.
4. Select your `it-fragrance` repository.
5. Vercel automatically detects **Vite**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click **Deploy**. Within 45 seconds, your website will be live at `https://it-fragrance.vercel.app`!
7. **Custom Domain**: In your Vercel Project Settings → **Domains**, add `itfragrance.com`. Follow the simple DNS record instructions.

---

## 3. Option B: Instant Drag-and-Drop on Netlify (No Git Required — 30 Seconds)

If you don't want to use GitHub:
1. Build the production folder locally by opening your terminal in the project folder and running:
   ```bash
   npm install
   npm run build
   ```
   *(This creates a `dist` folder on your computer)*
2. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
3. Drag and drop the `dist` folder directly into your browser window.
4. Netlify will immediately publish your website with a live URL and free HTTPS!
5. In Netlify Site Settings → **Domain Management**, you can link your custom domain `itfragrance.com`.

---

## 4. Option C: Cloudflare Pages (Free Unlimited Bandwidth)

1. Go to **[dash.cloudflare.com](https://dash.cloudflare.com)** → **Workers & Pages**.
2. Click **Create Application** → **Pages** → **Connect to Git**.
3. Select your repository.
4. Set:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click **Save and Deploy**.

---

## 5. Local Development on Your Machine

To run or edit the website locally on your computer:
1. Make sure you have Node.js (version 18 or 20+) installed from [nodejs.org](https://nodejs.org).
2. Open terminal in the project directory:
   ```bash
   # Install dependencies
   npm install

   # Start local development server
   npm run dev
   ```
3. Open `http://localhost:3000` (or the URL shown in terminal) to view the store.
4. When you are ready to build for production:
   ```bash
   npm run build
   ```
   The self-contained, optimized static website will be created in the `dist` folder.

---

## 6. Official WhatsApp & Business Configuration

- **WhatsApp Order Hotline**: Configured in `src/data/perfumes.ts`:
  - `WHATSAPP_NUMBER`: `"923128700031"`
  - `WHATSAPP_DISPLAY`: `"+92 312 8700031"`
- **Free Delivery Threshold**: Set in `src/components/CartDrawer.tsx` (Free nationwide delivery on orders $\ge$ Rs. 5,000, flat Rs. 200 standard courier otherwise).
- **Payment Methods**: Cash on Delivery (COD) and Bank Transfer / JazzCash / EasyPaisa supported in order confirmation templates.
