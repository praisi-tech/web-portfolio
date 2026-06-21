import { useState } from 'react';
import { motion } from 'framer-motion';
import { writeups } from '../data/writeups';
import './Writeups.css';

const categories = ['All', 'Web', 'Cryptography', 'OSINT', 'Miscellaneous'];
const diffColor = { Easy: 'emerald', Medium: 'blue', Hard: 'purple' };

export default function Writeups() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = writeups.filter(w =>
    activeCategory === 'All' || w.category === activeCategory
  );

  if (selected) {
    return (
      <div className="page-wrapper">
        <div className="section">
          <div className="container">
            <button id="writeup-back" className="btn btn-secondary btn-sm" onClick={() => setSelected(null)} style={{ marginBottom: 24 }}>
              ← Back to Writeups
            </button>
            <motion.div className="writeup-detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="writeup-detail__header">
                <div className="writeup-detail__badges">
                  <span className="badge">{selected.category}</span>
                  <span className={`badge badge-${diffColor[selected.difficulty] === 'emerald' ? '' : diffColor[selected.difficulty]}`}>{selected.difficulty}</span>
                  <span className="badge badge-blue">{selected.points} pts</span>
                </div>
                <h1 className="writeup-detail__title">{selected.title}</h1>
                <p className="writeup-detail__meta">{selected.competition} • {selected.date}</p>
              </div>

              <div className="writeup-detail__body">
                <section className="writeup-section card">
                  <h2>🎯 Challenge Analysis</h2>
                  <p>{selected.challenge}</p>
                </section>

                <section className="writeup-section card">
                  <h2>⚔️ Attack Methodology</h2>
                  <ol>
                    {selected.methodology.map((m, i) => <li key={i}>{m}</li>)}
                  </ol>
                </section>

                <section className="writeup-section card">
                  <h2>🔧 Solution Breakdown</h2>
                  <pre className="writeup-code"><code>{selected.solution}</code></pre>
                </section>

                <section className="writeup-flag">
                  <span>🚩 Flag:</span>
                  <code>{selected.flag}</code>
                </section>

                <div className="writeup-tags">
                  {selected.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Knowledge Sharing</span>
            <h1 className="section-title">CTF <span className="gradient-text">Writeups</span></h1>
            <p className="section-subtitle">Technical documentation of cybersecurity challenges, attack methodologies, and security research.</p>
          </motion.div>

          <div className="writeups__cats">
            {categories.map(cat => (
              <button
                key={cat}
                id={`writeup-cat-${cat.toLowerCase()}`}
                className={`projects__cat-btn ${activeCategory === cat ? 'projects__cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >{cat}</button>
            ))}
          </div>

          <div className="writeups__grid">
            {filtered.map((w, i) => (
              <motion.div
                key={w.id}
                className="writeup-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(w)}
              >
                {w.image && (
                  <div className="writeup-card__img-wrap">
                    <img src={w.image} alt={w.title} className="writeup-card__img" loading="lazy" />
                    <div className="writeup-card__img-overlay" />
                  </div>
                )}
                <div className="writeup-card__body">
                  <div className="writeup-card__top">
                    <div className="writeup-card__badges">
                      <span className="badge">{w.category}</span>
                      <span className={`badge badge-${diffColor[w.difficulty] === 'emerald' ? '' : diffColor[w.difficulty]}`}>{w.difficulty}</span>
                    </div>
                    <span className="writeup-card__pts">{w.points} pts</span>
                  </div>
                  <h3 className="writeup-card__title">{w.title}</h3>
                  <p className="writeup-card__comp">{w.competition} • {w.date}</p>
                  <p className="writeup-card__summary">{w.summary}</p>
                  <div className="writeup-card__tags">
                    {w.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="writeup-card__read">Read Writeup →</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
