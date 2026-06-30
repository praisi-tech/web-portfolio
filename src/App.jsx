import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { CTFProvider } from './context/CTFContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';

// Home is eager — it's the landing page, must be instant
import Home from './pages/Home';

// All other pages are lazy — only downloaded when the user navigates to them
const About            = lazy(() => import('./pages/About'));
const Projects         = lazy(() => import('./pages/Projects'));
const Experience       = lazy(() => import('./pages/Experience'));
const Certificates     = lazy(() => import('./pages/Certificates'));
const HackThePortfolio = lazy(() => import('./pages/HackThePortfolio'));
const SecretJourney    = lazy(() => import('./pages/SecretJourney'));
const Contact          = lazy(() => import('./pages/Contact'));
const NotFound         = lazy(() => import('./pages/NotFound'));
// CertificateClaim also lazy — extra heavy (jspdf + html2canvas)
const CertificateClaim = lazy(() => import('./pages/CertificateClaim'));

// Page-level skeleton loader
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      paddingTop: 'calc(var(--navbar-height) + 40px)',
      paddingBottom: '60px',
    }} className="container">
      {/* Header Skeleton */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '12px',
        marginBottom: '48px',
      }}>
        <div className="skeleton-shimmer skeleton-label" style={{ width: '80px' }} />
        <div className="skeleton-shimmer skeleton-title" style={{ width: '240px', maxWidth: '100%' }} />
        <div className="skeleton-shimmer skeleton-text" style={{ width: '400px', maxWidth: '100%', height: '14px' }} />
      </div>

      {/* Grid Skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {[1, 2, 3].map((n) => (
          <div key={n} className="skeleton-card">
            <div className="skeleton-shimmer skeleton-image" />
            <div className="skeleton-shimmer skeleton-title" style={{ height: '24px', width: '70%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="skeleton-shimmer skeleton-text" style={{ width: '100%' }} />
              <div className="skeleton-shimmer skeleton-text" style={{ width: '85%' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <div className="skeleton-shimmer skeleton-text" style={{ width: '60px', height: '24px', borderRadius: '9999px' }} />
              <div className="skeleton-shimmer skeleton-text" style={{ width: '80px', height: '24px', borderRadius: '9999px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Page transition variants — reduced motion aware via CSS
const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const pageTransition = {
  duration: 0.15,
  ease: [0.4, 0, 0.2, 1],
};

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

function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/projects" element={<AnimatedPage><Projects /></AnimatedPage>} />
          <Route path="/experience" element={<AnimatedPage><Experience /></AnimatedPage>} />
          <Route path="/certificates" element={<AnimatedPage><Certificates /></AnimatedPage>} />
          <Route path="/hack" element={<AnimatedPage><HackThePortfolio /></AnimatedPage>} />
          <Route path="/secret-journey" element={<AnimatedPage><SecretJourney /></AnimatedPage>} />
          <Route path="/certificate-claim" element={<AnimatedPage><CertificateClaim /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CTFProvider>
        <BrowserRouter>
          <ParticleBackground />
          <Navbar />
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      </CTFProvider>
    </ThemeProvider>
  );
}
