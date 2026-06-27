import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Moon, Sun, Shield, Home, User, FolderOpen,
  Briefcase, Mail, Terminal, Menu, X, ChevronRight, Award
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCTF } from '../context/CTFContext';
import './Navbar.css';

// Desktop top nav links
const desktopLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/hack', label: 'Hack The Portfolio', icon: <Shield size={13} /> },
  { to: '/contact', label: 'Contact' },
];

// Mobile primary tabs (4 visible)
const mobilePrimaryTabs = [
  { to: '/', label: 'Home', icon: <Home size={20} /> },
  { to: '/projects', label: 'Projects', icon: <FolderOpen size={20} /> },
  { to: '/experience', label: 'Experience', icon: <Briefcase size={20} /> },
  { to: '/certificates', label: 'Certificates', icon: <Award size={20} /> },
  { to: '/hack', label: 'Hack', icon: <Shield size={20} />, isHack: true },
];

// Mobile secondary links shown in the "More" sheet
const mobileMoreLinks = [
  { to: '/about', label: 'About', icon: <User size={20} /> },
  { to: '/contact', label: 'Contact', icon: <Mail size={20} /> },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { flagCount } = useCTF();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMoreOpen(false); }, [location]);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      {/* ── TOP NAVBAR (desktop only) ── */}
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-bracket">&lt;</span>
            <span className="navbar__logo-name">praisi</span>
            <span className="navbar__logo-bracket">/&gt;</span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {desktopLinks.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar__link ${isActive(link.to) ? 'navbar__link--active' : ''} ${link.to === '/hack' ? 'navbar__link--hack' : ''}`}
                >
                  {link.icon && link.icon}
                  {link.label}
                  {link.to === '/hack' && (
                    <span className="navbar__ctf-badge">{flagCount}/3</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme toggle (desktop) */}
          <div className="navbar__actions">
            <button
              id="theme-toggle"
              className="navbar__icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      <nav className="mobile-bottom-nav">
        <div className="mobile-bottom-nav__inner">
          {mobilePrimaryTabs.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`mobile-tab ${isActive(item.to) ? 'mobile-tab--active' : ''} ${item.isHack ? 'mobile-tab--hack' : ''}`}
              aria-label={item.label}
            >
              <span className="mobile-tab__icon">
                {item.icon}
                {item.isHack && flagCount > 0 && (
                  <span className="mobile-tab__badge">{flagCount}</span>
                )}
              </span>
              <span className="mobile-tab__label">{item.label}</span>
            </Link>
          ))}

          {/* More button */}
          <button
            className={`mobile-tab mobile-tab--more ${moreOpen ? 'mobile-tab--active' : ''}`}
            onClick={() => setMoreOpen(o => !o)}
            aria-label="More"
          >
            <span className="mobile-tab__icon">
              {moreOpen ? <X size={20} /> : <Menu size={20} />}
            </span>
            <span className="mobile-tab__label">{moreOpen ? 'Close' : 'More'}</span>
          </button>
        </div>
      </nav>

      {/* ── MORE SHEET OVERLAY ── */}
      <AnimatePresence>
        {moreOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
            />
            {/* Sheet */}
            <motion.div
              className="mobile-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="mobile-sheet__handle" />
              <div className="mobile-sheet__title">Menu</div>
              <div className="mobile-sheet__links">
                {mobileMoreLinks.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`mobile-sheet__link ${isActive(item.to) ? 'mobile-sheet__link--active' : ''}`}
                  >
                    <span className="mobile-sheet__link-icon">{item.icon}</span>
                    <span className="mobile-sheet__link-label">{item.label}</span>
                    <ChevronRight size={16} className="mobile-sheet__link-arrow" />
                  </Link>
                ))}
              </div>
              {/* Theme toggle */}
              <div className="mobile-sheet__footer">
                <button className="mobile-sheet__theme-btn" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
