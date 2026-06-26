import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Eye, FileText } from 'lucide-react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const handlePdfPreview = () => {
    const encoded = encodeURIComponent(project.pdf);
    window.open(`${window.location.origin}/pdfs/${encoded}`, '_blank');
  };

  const modalContent = (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`modal-panel ${project.thumbnail ? 'has-hero' : ''}`}
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 48, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={e => e.stopPropagation()}
      >
        <button id="modal-close" className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Hero Image */}
        {project.thumbnail && (
          <div className="modal-hero" style={{ cursor: 'zoom-in' }} onClick={() => window.open(project.thumbnail, '_blank')} title="Click to view full image">
            <img src={project.thumbnail} alt={project.name} className="modal-hero-img" />
          </div>
        )}

        {/* Information Side/Container */}
        <div className="modal-info">
          {/* Header */}
          <div className="modal-header">
            <div>
              <h2 className="modal-title">{project.name}</h2>
              <p className="modal-tagline">{project.tagline}</p>
            </div>
          </div>

          <div className="modal-body">
            {/* Description */}
            <p className="modal-description">{project.description}</p>

            {/* Tech Stack */}
            <section className="modal-section">
              <h3 className="modal-section-title">🛠 Technology Stack</h3>
              <div className="modal-tags">
                {project.tech.map(t => (
                  <span key={t} className="modal-tech-tag">{t}</span>
                ))}
              </div>
            </section>

            {/* Links */}
            <div className="modal-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link-btn modal-link-btn--github"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link-btn modal-link-btn--live"
                  aria-label="Live Site"
                >
                  <ExternalLink size={18} />
                </a>
              )}
              {project.pdf && (
                <button
                  className="modal-link-btn modal-link-btn--pdf"
                  onClick={handlePdfPreview}
                  aria-label="Preview PDF"
                >
                  <FileText size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}
