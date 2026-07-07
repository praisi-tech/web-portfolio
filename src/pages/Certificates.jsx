import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Search } from 'lucide-react';
import { certificates } from '../data/certificates';
import { useImagePreview } from '../context/ImagePreviewContext';
import './Certificates.css';

const categories = ['All', 'Tech', 'Leadership'];

export default function CertificatesPage() {
  const [certSearch, setCertSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { openPreview } = useImagePreview();

  const filtered = certificates.filter(cert => {
    const matchCat = activeCategory === 'All' || cert.category === activeCategory;
    const query = certSearch.toLowerCase();
    const matchSearch = cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query) ||
      cert.category.toLowerCase().includes(query);

    return matchCat && matchSearch;
  });

  const achievements = filtered.filter(item => item.type === 'achievement');
  const certsOnly = filtered.filter(item => item.type === 'certificate');

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
              Achievements & <span className="gradient-text">Certificates</span>
            </h1>
            <p className="section-subtitle">
              A curated collection of my professional achievements, awards, and verified credentials.
            </p>
          </motion.div>

          <div className="certs-filters">
            <div className="certs__search-wrap">
              <Search size={16} className="certs__search-icon" />
              <input
                id="cert-search"
                type="text"
                placeholder="Search credentials..."
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
              <p>No achievements or certificates match your search query.</p>
            </div>
          ) : (
            <div className="certs-sections-container">
              {/* Achievements Section */}
              {achievements.length > 0 && (
                <div className="certs-section">
                  <h2 className="certs__section-title">
                    Key <span className="gradient-text">Achievements</span>
                  </h2>
                  <div className="certs-page__grid" style={{ marginBottom: '40px' }}>
                    {achievements.map((item, i) => (
                      <motion.div
                        key={item.id}
                        className="cert-page-card card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => openPreview(item.image, item.title, item.title, `${item.issuer} • ${item.issueDate}`)}
                        style={{ cursor: 'pointer' }}
                        title="Click to view details"
                      >
                        <div className="cert-page-card__img-wrap">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="cert-page-card__img"
                            loading="lazy"
                          />
                        </div>
                        <div className="cert-page-card__body">
                          <div className="cert-page-card__header">
                            <div className="cert-page-card__icon"><Award size={20} /></div>
                          </div>
                          <h3 className="cert-page-card__title">{item.title}</h3>
                          <p className="cert-page-card__issuer">{item.issuer}</p>
                          <div className="cert-page-card__meta">
                            <span className="cert-page-card__date">{item.issueDate}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates Section */}
              {certsOnly.length > 0 && (
                <div className="certs-section">
                  <h2 className="certs__section-title">
                    Professional <span className="gradient-text">Certificates</span>
                  </h2>
                  <div className="certs-page__grid">
                    {certsOnly.map((item, i) => (
                      <motion.div
                        key={item.id}
                        className="cert-page-card card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => openPreview(item.image, item.title, item.title, `${item.issuer} • ${item.issueDate}`)}
                        style={{ cursor: 'pointer' }}
                        title="Click to view details"
                      >
                        <div className="cert-page-card__img-wrap">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="cert-page-card__img"
                            loading="lazy"
                          />
                        </div>
                        <div className="cert-page-card__body">
                          <div className="cert-page-card__header">
                            <div className="cert-page-card__icon"><Award size={20} /></div>
                          </div>
                          <h3 className="cert-page-card__title">{item.title}</h3>
                          <p className="cert-page-card__issuer">{item.issuer}</p>
                          <div className="cert-page-card__meta">
                            <span className="cert-page-card__date">{item.issueDate}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
