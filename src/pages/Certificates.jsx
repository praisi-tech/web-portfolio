import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Search } from 'lucide-react';
import { certificates } from '../data/certificates';
import './Certificates.css';

const categories = ['All', 'Tech', 'Leadership'];

export default function CertificatesPage() {
  const [certSearch, setCertSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = certificates.filter(cert => {
    const matchCat = activeCategory === 'All' || cert.category === activeCategory;
    const query = certSearch.toLowerCase();
    const matchSearch = cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query) ||
      cert.category.toLowerCase().includes(query);

    return matchCat && matchSearch;
  });

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span className="section-label">Credentials</span>
            <h1 className="section-title">
              Certificates & <span className="gradient-text">Badges</span>
            </h1>
            <p className="section-subtitle">
              A curated collection of my verified professional credentials and achievements.
            </p>
          </motion.div>

          <div className="certs-filters">
            <div className="certs__search-wrap">
              <Search size={16} className="certs__search-icon" />
              <input
                id="cert-search"
                type="text"
                placeholder="Search certificates..."
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                className="input certs__search"
              />
            </div>

            <div className="certs-cats">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`certs__cat-btn ${activeCategory === cat ? 'certs__cat-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="certs-empty card">
              <p>No certificates match your current search.</p>
            </div>
          ) : (
            <div className="certs-page__grid">
              {filtered.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  className="cert-page-card card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => window.open(cert.image, '_blank', 'noopener,noreferrer')}
                  style={{ cursor: 'pointer' }}
                  title="Click to view full certificate"
                >
                  <div className="cert-page-card__img-wrap">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="cert-page-card__img"
                      loading="lazy"
                    />
                  </div>
                  <div className="cert-page-card__body">
                    <div className="cert-page-card__header">
                      <div className="cert-page-card__icon"><Award size={20} /></div>
                    </div>
                    <h3 className="cert-page-card__title">{cert.title}</h3>
                    <p className="cert-page-card__issuer">{cert.issuer}</p>
                    <div className="cert-page-card__meta">
                      <span className="cert-page-card__date">{cert.issueDate}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
