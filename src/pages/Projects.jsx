import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Github, Code, FileText } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectModal from '../components/ProjectModal';
import './Projects.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45 } }),
};

export default function Projects() {
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = projects.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          {/* Header */}
          <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Portfolio</span>
            <h1 className="section-title">Selected <span className="gradient-text">Projects</span></h1>
            <p className="section-subtitle">A showcase of work demonstrating technical depth, problem-solving, and a focus on building secure, impactful solutions.</p>
          </motion.div>

          {/* Filters */}
          <motion.div className="projects__filters" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="projects__search-wrap">
              <Search size={16} className="projects__search-icon" />
              <input
                id="project-search"
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input projects__search"
              />
            </div>
          </motion.div>

          {/* Grid */}
          <div className="projects__grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="project-card card"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedProject(project)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Image */}
                  <div className="project-card__img">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.name} className="project-card__thumb" loading="lazy" />
                    ) : (
                      <div className="project-card__img-bg">
                        <span className="project-card__emoji">
                          <Code size={40} />
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="project-card__body">
                    <h3 className="project-card__name">{project.name}</h3>
                    <p className="project-card__tagline">{project.tagline}</p>
                    <p className="project-card__desc">{project.description}</p>

                    <div className="project-card__tech">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="tag">+{project.tech.length - 3}</span>
                      )}
                    </div>

                    <div className="project-card__footer">
                      <div className="project-card__links" onClick={e => e.stopPropagation()}>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link-icon" aria-label="GitHub">
                            <Github size={16} />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-card__link-icon" aria-label="Live Demo">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {project.pdf && (
                          <button
                            className="project-card__link-icon"
                            onClick={e => {
                              e.stopPropagation();
                              window.open(`${window.location.origin}/pdfs/${encodeURIComponent(project.pdf)}`, '_blank');
                            }}
                            aria-label="Preview PDF"
                          >
                            <FileText size={16} />
                          </button>
                        )}
                      </div>
                      <span className="project-card__view-hint">Click to view →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="projects__empty">
              <p>No projects found. Try a different search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

