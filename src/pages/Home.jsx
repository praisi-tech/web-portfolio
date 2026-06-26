import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, ArrowRight, User, Lock, Cpu, Trophy, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const subtitles = ['Software Engineer', 'Cybersecurity Enthusiast', 'Problem Solver', 'Tech Leader', 'Innovation'];

const socials = [
  { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/praisi-tech', id: 'social-github' },
  { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/praisiliapandoh/', id: 'social-linkedin' },
  { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://www.instagram.com/thruhlens_', id: 'social-instagram' },
];

// Floating chips using Lucide icons (no emoji)
const chips = [
  { icon: <Lock size={14} />, label: 'Cybersecurity', cls: 'hero__chip--1' },
  { icon: <Cpu size={14} />, label: 'Software Eng.', cls: 'hero__chip--2' },
  { icon: <Trophy size={14} />, label: 'CTF Player', cls: 'hero__chip--3' },
];

export default function Home() {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = subtitles[subtitleIdx];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setSubtitleIdx(i => (i + 1) % subtitles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, subtitleIdx]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        {/* Background layers */}
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-noise" />
          <div className="hero-gradient-blur hero-gradient-blur--1" />
          <div className="hero-gradient-blur hero-gradient-blur--2" />
        </div>

        <div className="container hero__content">
          {/* Left: Identity */}
          <motion.div
            className="hero__left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="hero__badge">
              <span className="hero__badge-dot" />
              Available for opportunities
            </motion.div>

            <motion.div variants={itemVariants} className="hero__intro">
              Praisilia Anastasya
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero__title heading-display">
              Give your system<br />
              some <span className="gradient-text">secure space</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="hero__subtitle">
              <span className="hero__subtitle-text">{displayed}</span>
              <span className={`hero__cursor${!typing && displayed.length === subtitles[subtitleIdx].length ? ' animate-blink' : ''}`}>|</span>
            </motion.div>

            <motion.p variants={itemVariants} className="hero__desc">
              I build secure, deployed software and explore the intersections of
              software engineering and cybersecurity.
            </motion.p>

            {/* Social links */}
            <motion.div variants={itemVariants} className="hero__socials">
              {socials.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="hero__ctas">
              <Link to="/projects" id="cta-projects" className="btn btn-primary btn-lg">
                View Projects <ArrowRight size={18} />
              </Link>
              <Link to="/hack" id="cta-hack" className="btn btn-secondary btn-lg">
                <Shield size={16} /> Hack The Portfolio
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Portrait */}
          <motion.div
            className="hero__right"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero__portrait-wrapper animate-float">
              <div className="hero__portrait-ring hero__portrait-ring--outer animate-spin-slow" />
              <div className="hero__portrait-ring hero__portrait-ring--inner" />
              <div className="hero__portrait">
                <img
                  src="/profile/Praisilia-home.webp"
                  alt="Praisilia Anastasya"
                />
              </div>
              {/* Floating chips — Lucide icons only */}
              {chips.map(c => (
                <div key={c.cls} className={`hero__chip ${c.cls}`}>
                  {c.icon}
                  {c.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
