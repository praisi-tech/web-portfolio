import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, FolderOpen, User, Mail } from 'lucide-react';
import './NotFound.css';

const quickLinks = [
  { to: '/', icon: <Home size={14} />, label: 'Home' },
  { to: '/about', icon: <User size={14} />, label: 'About' },
  { to: '/projects', icon: <FolderOpen size={14} />, label: 'Projects' },
  { to: '/contact', icon: <Mail size={14} />, label: 'Contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function NotFound() {
  return (
    <div className="notfound">
      {/* Background blobs */}
      <div className="notfound__bg">
        <div className="notfound__blur-1" />
        <div className="notfound__blur-2" />
      </div>

      <motion.div
        className="notfound__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glitch code */}
        <motion.div className="notfound__code" variants={itemVariants}>
          404
        </motion.div>

        {/* Status badge */}
        <motion.div className="notfound__status" variants={itemVariants}>
          <span className="notfound__status-dot" />
          Page not found
        </motion.div>

        {/* Terminal decoration */}
        <motion.div className="notfound__terminal" variants={itemVariants}>
          <div className="notfound__terminal-bar">
            <span className="notfound__terminal-dot" />
            <span className="notfound__terminal-dot" />
            <span className="notfound__terminal-dot" />
          </div>
          <div className="notfound__terminal-body">
            <div className="notfound__terminal-line notfound__terminal-line--cmd">
              $ curl {window.location.pathname}
            </div>
            <div className="notfound__terminal-line notfound__terminal-line--err">
              Error 404: Resource not found
            </div>
            <div className="notfound__terminal-line">
              Status: 404 NOT FOUND
            </div>
            <div className="notfound__terminal-line notfound__terminal-line--hint">
              # Try navigating to a valid route ↓
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 className="notfound__title" variants={itemVariants}>
          Oops! This page doesn't exist
        </motion.h1>

        <motion.p className="notfound__desc" variants={itemVariants}>
          The page you're looking for has been moved, deleted, or never existed.
          Let's get you back on track.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="notfound__actions" variants={itemVariants}>
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/projects" className="btn btn-secondary btn-lg">
            View Projects <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={itemVariants}>
          <p className="notfound__links-label">Quick navigation</p>
          <div className="notfound__links">
            {quickLinks.map(({ to, icon, label }) => (
              <Link key={to} to={to} className="notfound__link">
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
