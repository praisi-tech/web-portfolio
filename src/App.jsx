import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { CTFProvider } from './context/CTFContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Certificates from './pages/Certificates';
import HackThePortfolio from './pages/HackThePortfolio';
import SecretJourney from './pages/SecretJourney';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Keep CertificateClaim lazy because of heavy libraries (jspdf, html2canvas)
const CertificateClaim = lazy(() => import('./pages/CertificateClaim'));

// Minimal page-level loading state (invisible shimmer)
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
    }}>
      <motion.div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--accent-emerald)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
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
