import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';
import './ImagePreviewModal.css';

export default function ImagePreviewModal({ src, alt, title, caption, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const modalContent = (
    <motion.div
      className="img-preview-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="img-preview-close" onClick={onClose} aria-label="Close preview">
        <X size={24} />
      </button>

      <motion.div
        className="img-preview-container"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={`img-preview-img-wrap ${isZoomed ? 'zoomed' : ''}`} onClick={() => setIsZoomed(!isZoomed)}>
          <img
            src={src}
            alt={alt}
            className="img-preview-img"
            style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
          />
          <span className="img-preview-zoom-indicator">
            {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          </span>
        </div>

        {(title || caption) && (
          <div className="img-preview-info">
            {title && <h3 className="img-preview-title">{title}</h3>}
            {caption && <p className="img-preview-caption">{caption}</p>}
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}
