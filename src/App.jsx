import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { CTFProvider } from './context/CTFContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import HackThePortfolio from './pages/HackThePortfolio';
import SecretJourney from './pages/SecretJourney';
import CertificateClaim from './pages/CertificateClaim';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HashRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const cleanPath = window.location.hash.substring(2);
      // Clean hash from browser url
      window.history.replaceState(null, '', '/' + cleanPath);
      // Navigate internally in React Router
      navigate('/' + cleanPath, { replace: true });
    }
  }, [navigate]);

  return null;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/hack" element={<HackThePortfolio />} />
        <Route path="/secret-journey" element={<SecretJourney />} />
        <Route path="/certificate-claim" element={<CertificateClaim />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CTFProvider>
        <BrowserRouter>
          <ScrollToTop />
          <HashRedirect />
          {/* Global particle canvas — fixed behind all pages */}
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

