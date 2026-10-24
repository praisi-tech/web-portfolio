import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, ArrowRight, ShieldCheck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { preloadPage } from '../App';
import { useImagePreview } from '../context/ImagePreviewContext';
import './Home.css';

// All navigable page routes — prefetch their JS chunks during idle time
const ALL_ROUTES = ['/about', '/projects', '/experience', '/achievements', '/hack', '/contact'];

const socials = [
  { icon: <Github size={16} />, label: 'GitHub', href: 'https://github.com/praisi-tech', id: 'social-github' },
  { icon: <Linkedin size={16} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/praisiliapandoh/', id: 'social-linkedin' },
  { icon: <Instagram size={16} />, label: 'Instagram', href: 'https://www.instagram.com/thruhlens_', id: 'social-instagram' },
];

const STAR = 'M12 0 C12.6 7.2 16.8 11.4 24 12 C16.8 12.6 12.6 16.8 12 24 C11.4 16.8 7.2 12.6 0 12 C7.2 11.4 11.4 7.2 12 0Z';

export default function Home() {
  const { openPreview } = useImagePreview();

  // Preload all other page chunks after a delay so it does not compete with home page assets
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(() => {
          ALL_ROUTES.forEach(route => preloadPage(route));
        });
      } else {
        ALL_ROUTES.forEach(route => preloadPage(route));
      }
    }, 4000); // 4 seconds delay ensures initial page load is fully finished first

    return () => clearTimeout(timer);
  }, []);

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.2, 0, 0, 1] },
  });

  return (
    <div className="home">
      <section className="hero">
        {/* Rotating text badge */}
        <div className="hero__seal" aria-hidden="true">
          <svg viewBox="0 0 120 120" className="hero__seal-ring animate-spin-slow">
            <defs>
              <path id="seal-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text>
              <textPath href="#seal-circle" textLength="272" lengthAdjust="spacing">
                A MORE SECURE WEB · EVERY DAY ·
              </textPath>
            </text>
          </svg>
          <svg viewBox="0 0 24 24" className="hero__seal-star"><path d={STAR} /></svg>
        </div>

        <div className="container hero__top">
          <motion.h1 className="hero__title" {...rise(0)}>
            Give your system<br />
            some <em>secure space.</em>
          </motion.h1>

          <motion.p className="hero__desc" {...rise(0.1)}>
            Turn business into digital solutions. Praisilia Anastasya builds
            secure, deployed software for real-world problems.
          </motion.p>

          <motion.div className="hero__ctas" {...rise(0.2)}>
            <Link to="/projects" id="cta-projects" className="hero__btn hero__btn--solid">
              View projects <ArrowRight size={16} />
            </Link>
            <Link to="/hack" id="cta-hack" className="hero__btn hero__btn--outline">
              <span className="hero__btn-icon"><Shield size={12} /></span>
              Hack the portfolio
            </Link>
          </motion.div>
        </div>

        {/* Stage: portrait + floating cards */}
        <motion.div className="container hero__stage" {...rise(0.3)}>
          <svg className="hero__lines" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
            <path d="M120 215 C 120 400, 260 440, 390 425" />
            <path d="M1080 280 C 1080 400, 960 420, 830 405" />
          </svg>

          <div className="hero__card hero__card--left">
            <span className="hero__card-icon"><ShieldCheck size={16} /></span>
            <h2>Secure by design.</h2>
            <p>Software that holds up under pressure.</p>
          </div>

          <div className="hero__card hero__card--right">
            <div className="hero__socials">
              {socials.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <h2>Let’s build together.</h2>
            <p>Open to internships and collaborations.</p>
          </div>

          <div
            className="hero__portrait"
            style={{ cursor: 'zoom-in' }}
            onClick={() => openPreview('/profile/Praisilia-home.webp', 'Praisilia Anastasya', 'Praisilia Anastasya', 'Software Engineer & Cybersecurity Enthusiast')}
          >
            <img
              src="/profile/Praisilia-home.webp"
              alt="Praisilia Anastasya"
              fetchpriority="high"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="hero__note hero__note--left">
            <span className="hero__rule" />
            <p>Software engineer &amp; cybersecurity enthusiast at President University, Indonesia.</p>
          </div>

          <div className="hero__note hero__note--right">
            <svg viewBox="0 0 24 24" className="hero__note-star"><path d={STAR} /></svg>
            <p>Build secure.<br />Ship clear.</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
