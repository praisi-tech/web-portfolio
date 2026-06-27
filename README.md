<div align="center">

<img src="public/favicon.svg" alt="Logo" width="72" height="72" />

# Praisilia Anastasya — Portfolio

**Software Engineer & Cybersecurity Enthusiast**

[![Live Site](https://img.shields.io/badge/Live%20Site-praisilia--portfolio.vercel.app-E25B8B?style=for-the-badge&logo=vercel&logoColor=white)](https://praisilia-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-60A5FA?style=for-the-badge)](LICENSE)

</div>

---

## 📖 About

Personal portfolio website for **Praisilia Anastasya**, an Information Technology student from President University, Indonesia. Built with a focus on security-first engineering, smooth UX, and a premium design aesthetic — featuring an interactive CTF (Capture The Flag) easter egg challenge hidden throughout the site.

## ✨ Features

- 🎨 **Premium dark/light theme** with smooth transitions and glassmorphism
- ⌨️ **Typewriter hero animation** — GPU-accelerated for zero-jank mobile rendering
- 🌐 **Interactive particle background** — mouse-reactive on desktop, performance-tuned on mobile
- 🔐 **Hack The Portfolio** — a hidden CTF challenge with 3 flags to find across the site
- 📜 **Certificate Claim** — generate shareable PDF certificates for CTF winners
- 📱 **Mobile-first bottom tab navigation** with spring animations
- 🔄 **Smooth page transitions** via Framer Motion
- 🗺️ **Sitemap + robots.txt** for Google Search Console indexing
- 💡 **Prefers-reduced-motion** support throughout

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | Vanilla CSS + CSS Variables |
| Particles | Custom Canvas (no library) |
| PDF Generation | jsPDF + html2canvas |
| Deployment | Vercel |

## 📂 Project Structure

```
portfolio/
├── public/
│   ├── certificates/     # Certificate template assets
│   ├── experience/       # Company logos
│   ├── images/           # Project screenshots
│   ├── pdfs/             # Downloadable PDFs
│   ├── profile/          # Profile photos
│   ├── favicon.svg
│   ├── robots.txt        # SEO crawler config
│   ├── sitemap.xml       # Google sitemap
│   └── vercel.json       # SPA rewrite rules
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── Navbar.jsx        # Desktop top nav + mobile bottom tab bar
│   │   └── ParticleBackground.jsx
│   ├── context/
│   │   ├── CTFContext.jsx    # CTF flag state management
│   │   └── ThemeContext.jsx  # Dark/light theme
│   ├── data/
│   │   ├── certificates.js
│   │   ├── experience.js
│   │   └── projects.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── CertificateClaim.jsx
│   │   ├── Certificates.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── HackThePortfolio.jsx  # CTF challenge page
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx          # Custom 404 with glitch animation
│   │   ├── Projects.jsx
│   │   └── SecretJourney.jsx
│   ├── App.jsx           # Routing + lazy loading
│   ├── index.css         # Global design tokens + utilities
│   └── main.jsx
├── vercel.json           # Root-level SPA rewrites + caching headers
├── vite.config.js        # Build config with chunk splitting
└── index.html            # SEO meta, Open Graph, Twitter Card
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/praisi-tech/web-portfolio.git
cd web-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## 🏗️ Build & Deploy

The site is deployed on **Vercel** with automatic deployments from the `main` branch.

```bash
# Production build
npm run build

# Preview before deploying
npm run preview
```

The `vercel.json` at the project root ensures all routes (e.g. `/about`, `/projects`) are properly rewritten to `index.html` for client-side routing.

## 🗺️ Pages & Routes

| Route | Page | Indexed by Google |
|---|---|---|
| `/` | Home | ✅ |
| `/about` | About Me | ✅ |
| `/projects` | Projects | ✅ |
| `/experience` | Experience | ✅ |
| `/certificates` | Certificates | ✅ |
| `/contact` | Contact | ✅ |
| `/hack` | Hack The Portfolio (CTF) | ❌ |
| `/secret-journey` | Secret Journey | ❌ |
| `/certificate-claim` | Certificate Claim | ❌ |
| `*` | 404 Not Found | ❌ |

## 🔐 CTF Challenge

**Hack The Portfolio** is a Capture The Flag challenge hidden throughout the site. Find all **3 flags** to unlock a certificate.

> 🚩 **Hint:** The first flag is hiding in plain sight...

## 📈 SEO

- **Sitemap:** [`/sitemap.xml`](https://praisilia-portfolio.vercel.app/sitemap.xml)
- **Robots:** [`/robots.txt`](https://praisilia-portfolio.vercel.app/robots.txt)
- Submit the sitemap to [Google Search Console](https://search.google.com/search-console) for indexing.

## 🎨 Design System

The design is built on a CSS variable token system in [`src/index.css`](src/index.css):

- **Colors:** Soft pink (`#E25B8B`) + blue (`#3B82F6`) gradient palette
- **Typography:** Inter (Google Fonts) with 8 weight variants
- **Glassmorphism:** `backdrop-filter: blur()` on cards and navbar
- **Animations:** Framer Motion for page transitions, custom CSS for micro-animations
- **Responsive:** Mobile-first with a bottom tab bar below 900px

## 📱 Mobile Performance

- Particle count: **30 on mobile** (vs. 80 on desktop)
- Mouse tracking: **disabled on touch devices**
- Animation loop: **paused when tab is hidden** (saves battery)
- Typewriter: **GPU-accelerated** via `translateZ(0)`
- Scroll: **iOS momentum scrolling** enabled

## 📄 License

MIT © [Praisilia Anastasya](https://github.com/praisi-tech)
