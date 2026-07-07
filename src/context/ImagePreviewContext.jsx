import { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ImagePreviewModal from '../components/ImagePreviewModal';

const ImagePreviewContext = createContext();

export function ImagePreviewProvider({ children }) {
  const [previewData, setPreviewData] = useState({
    isOpen: false,
    src: '',
    alt: '',
    title: '',
    caption: '',
  });

  const openPreview = (src, alt, title = '', caption = '') => {
    setPreviewData({
      isOpen: true,
      src,
      alt,
      title,
      caption,
    });
  };

  const closePreview = () => {
    setPreviewData(prev => ({ ...prev, isOpen: false }));
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closePreview();
    };
    if (previewData.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewData.isOpen]);

  return (
    <ImagePreviewContext.Provider value={{ openPreview, closePreview }}>
      {children}
      <AnimatePresence>
        {previewData.isOpen && (
          <ImagePreviewModal
            src={previewData.src}
            alt={previewData.alt}
            title={previewData.title}
            caption={previewData.caption}
            onClose={closePreview}
          />
        )}
      </AnimatePresence>
    </ImagePreviewContext.Provider>
  );
}

export const useImagePreview = () => useContext(ImagePreviewContext);
