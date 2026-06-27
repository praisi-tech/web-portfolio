import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, GraduationCap, ChevronDown, MapPin, Mic } from 'lucide-react';
import { experiences } from '../data/experience';
import './Experience.css';

const mcEvents = [
  {
    title: 'Ambassador Lecture',
    subtitle: 'President University',
    description: 'Bilateral Relations between Indonesia and Ethiopia, hosting diplomats and academic leaders.',
  },
  {
    title: 'President University Nusantara Dinner — Manado Edition',
    subtitle: 'President University',
    description: 'Annual cultural showcase and dinner celebrating regional diversity.',
  },
  {
    title: 'Compsphere',
    subtitle: 'PUFA Computer Science',
    description: 'Technology event featuring hackathons, seminars, and talk shows on emerging technologies.',
  },
  {
    title: 'AIESEC Future Leaders',
    subtitle: 'AIESEC In PU (2025 & 2026)',
    description: 'Leadership development program featuring seminars, mentorship, and interactive workshops.',
  },
  {
    title: 'CooL Christmas',
    subtitle: 'Community of Love',
    description: 'Annual Christmas celebration for President University students.',
  },
  {
    title: 'Impacted',
    subtitle: 'AIESEC In PU',
    description: 'Youth development program focused on social impact and the SDGs.',
  },
];

const typeIcon = {
  work: <Briefcase size={16} />,
  organization: <Users size={16} />,
  education: <GraduationCap size={16} />,
};
const typeColor = { work: 'emerald', organization: 'blue', education: 'purple' };

function TimelineItem({ exp, index, openId, setOpenId }) {
  const open = openId === exp.id;
  const color = typeColor[exp.type];
  const isRight = index % 2 === 1;

  const handleClick = () => setOpenId(open ? null : exp.id);

  return (
    <motion.div
      className={`timeline-item timeline-item--${isRight ? 'right' : 'left'}`}
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Center dot */}
      <div className={`timeline-dot timeline-dot--${color}`}>
        <div className={`timeline-dot__inner timeline-dot__inner--${color}`}>
          {typeIcon[exp.type]}
        </div>
      </div>

      <div className="timeline-card card" onClick={handleClick}>
        {/* Photo banner */}
        {exp.image && (
          <div className="timeline-card__img-wrap">
            <img src={exp.image} alt={exp.organization} className="timeline-card__img" loading="lazy" />
            <div className="timeline-card__img-overlay" />
          </div>
        )}
        <div className="timeline-card__header">
          <div className="timeline-card__meta">
            <span className={`badge badge-${color === 'emerald' ? '' : color}`}>{exp.type}</span>
            <span className="timeline-card__duration">{exp.duration}</span>
          </div>
          <ChevronDown
            size={18}
            className={`timeline-card__chevron ${open ? 'timeline-card__chevron--open' : ''}`}
          />
        </div>
        <h3 className="timeline-card__position">{exp.position}</h3>
        <p className="timeline-card__org">{exp.organization}</p>
        <p className="timeline-card__location"><MapPin size={13} /> {exp.location}</p>

        <AnimatePresence>
          {open && (
            <motion.div
              className="timeline-card__details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="timeline-card__description">{exp.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  // accordion state: one open card at a time per section
  const [openLeadId, setOpenLeadId] = useState(null);

  return (
    <div className="page-wrapper">
      {/* ── Experience & Leadership Timeline ── */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Professional & Volunteer</span>
            <h1 className="section-title">
              Experience & <span className="gradient-text">Leadership</span>
            </h1>
            <p className="section-subtitle">
              My professional path and organizational leadership roles.
            </p>
          </motion.div>

          <div className="timeline">
            {experiences
              .filter(exp => exp.type === 'work' || exp.type === 'organization')
              .map((exp, i) => (
                <TimelineItem key={exp.id} exp={exp} index={i} openId={openLeadId} setOpenId={setOpenLeadId} />
              ))}
          </div>
        </div>
      </section>


      {/* ── Master of Ceremonies ── */}
      <section className="section experience__mc">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Public Speaking</span>
            <h2 className="section-title">
              Master of <span className="gradient-text">Ceremonies</span>
            </h2>
            <p className="section-subtitle">
              Hosting, public speaking, and leading premium events to connect and engage diverse audiences.
            </p>
          </motion.div>

          <div className="mc-grid">
            {mcEvents.map((event, i) => (
              <motion.div
                key={i}
                className="mc-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <div className="mc-card__icon-wrap">
                  <Mic size={20} />
                </div>
                <div className="mc-card__body">
                  <div className="mc-card__meta">
                    <span className="badge badge-blue">MC / Host</span>
                    <span className="mc-card__subtitle">{event.subtitle}</span>
                  </div>
                  <h3 className="mc-card__title">{event.title}</h3>
                  <p className="mc-card__description">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
