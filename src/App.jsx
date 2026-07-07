import { lazy, Suspense, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { CTFProvider } from './context/CTFContext';
import { ImagePreviewProvider } from './context/ImagePreviewContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';

// ─── Per-page lazy imports (Vite creates separate chunks per page) ───────────
// Home is eager — it's the LCP page, must be instant
import Home from './pages/Home';

const About            = lazy(() => import('./pages/About'));
const Projects         = lazy(() => import('./pages/Projects'));
const Experience       = lazy(() => import('./pages/Experience'));
const Certificates     = lazy(() => import('./pages/Certificates'));
const HackThePortfolio = lazy(() => import('./pages/HackThePortfolio'));
const SecretJourney    = lazy(() => import('./pages/SecretJourney'));
const Contact          = lazy(() => import('./pages/Contact'));
const NotFound         = lazy(() => import('./pages/NotFound'));
const CertificateClaim = lazy(() => import('./pages/CertificateClaim'));

// ─── Route → import map for hover preloading ────────────────────────────────
// Attach these to Navbar link onMouseEnter so pages are already fetched
// before the user actually clicks — makes navigation feel instant.
export const preloadPage = (path) => {
  switch (path) {
    case '/about':          return import('./pages/About');
    case '/projects':       return import('./pages/Projects');
    case '/experience':     return import('./pages/Experience');
    case '/achievements':   return import('./pages/Certificates');
    case '/certificates':   return import('./pages/Certificates');
    case '/hack':           return import('./pages/HackThePortfolio');
    case '/secret-journey': return import('./pages/SecretJourney');
    case '/contact':        return import('./pages/Contact');
    case '/certificate-claim': return import('./pages/CertificateClaim');
    default: return null;
  }
};

// ─── Suspense fallback: invisible — keeps current page visible while chunk
//     downloads in the background. No skeleton flash ever shown.
function SilentFallback() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />
  );
}

// ─── Page transition ─────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -6 },
};
const pageTransition = { duration: 0.15, ease: [0.4, 0, 0.2, 1] };

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

// ─── SEO Page Metadata Map ───────────────────────────────────────────────────
const PAGE_METADATA = {
  '/': {
    title: 'Praisilia Anastasya | Software Engineer & Cybersecurity Enthusiast',
    description: 'Praisilia Anastasya — Software Engineer & Cybersecurity Enthusiast. Building secure, impactful digital products. President University, Indonesia.'
  },
  '/about': {
    title: 'About | Praisilia Anastasya',
    description: 'Learn more about Praisilia Anastasya, her journey, skills, and background in Software Engineering and Cybersecurity.'
  },
  '/projects': {
    title: 'Projects | Praisilia Anastasya',
    description: 'Explore the software development and cybersecurity projects built by Praisilia Anastasya, featuring tech stacks like React, Next.js, Go, and Laravel.'
  },
  '/experience': {
    title: 'Experience | Praisilia Anastasya',
    description: 'Read about Praisilia Anastasya\'s professional experience, technical roles, leadership activities, and educational background.'
  },
  '/achievements': {
    title: 'Achievements & Certificates | Praisilia Anastasya',
    description: 'View the achievements, hackathon wins, and professional certificates earned by Praisilia Anastasya in cybersecurity and engineering.'
  },
  '/contact': {
    title: 'Contact | Praisilia Anastasya',
    description: 'Get in touch with Praisilia Anastasya for inquiries, collaborations, or internship opportunities.'
  }
};

// ─── Routes ──────────────────────────────────────────────────────────────────
function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const meta = PAGE_METADATA[location.pathname] || PAGE_METADATA['/'];
    document.title = meta.title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', meta.description);

    // Update Canonical Link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://praisilia-portfolio.vercel.app${location.pathname}`);
    }

    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://praisilia-portfolio.vercel.app${location.pathname}`);

    // Update Twitter
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', meta.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', meta.description);
  }, [location.pathname]);

  return (
    <Suspense fallback={<SilentFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                  element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about"             element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/projects"          element={<AnimatedPage><Projects /></AnimatedPage>} />
          <Route path="/experience"        element={<AnimatedPage><Experience /></AnimatedPage>} />
          <Route path="/achievements"      element={<AnimatedPage><Certificates /></AnimatedPage>} />
          <Route path="/certificates"      element={<Navigate to="/achievements" replace />} />
          <Route path="/hack"              element={<AnimatedPage><HackThePortfolio /></AnimatedPage>} />
          <Route path="/secret-journey"    element={<AnimatedPage><SecretJourney /></AnimatedPage>} />
          <Route path="/certificate-claim" element={<AnimatedPage><CertificateClaim /></AnimatedPage>} />
          <Route path="/contact"           element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="*"                  element={<AnimatedPage><NotFound /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CTFProvider>
        <ImagePreviewProvider>
          <BrowserRouter>
            <ParticleBackground />
            <Navbar />
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </BrowserRouter>
        </ImagePreviewProvider>
      </CTFProvider>
    </ThemeProvider>
  );
}
