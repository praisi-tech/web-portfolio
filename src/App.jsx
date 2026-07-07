import { lazy, Suspense, useCallback } from 'react';
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

// ─── Routes ──────────────────────────────────────────────────────────────────
function AppRoutes() {
  const location = useLocation();

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
