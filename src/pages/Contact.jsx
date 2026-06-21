import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, Briefcase, Users, Shield, Globe, BookOpen, Sparkles, Rocket } from 'lucide-react';
import './Contact.css';

const contacts = [
  {
    id: 'contact-email',
    icon: <Mail size={24} />,
    label: 'Email',
    value: 'praisilia.productive@gmail.com',
    href: 'mailto:praisilia.productive@gmail.com',
    desc: 'Best for professional inquiries',
    color: 'emerald',
  },
  {
    id: 'contact-linkedin',
    icon: <Linkedin size={24} />,
    label: 'LinkedIn',
    value: 'praisiliapandoh',
    href: 'https://www.linkedin.com/in/praisiliapandoh/',
    desc: 'Connect professionally',
    color: 'blue',
  },
  {
    id: 'contact-github',
    icon: <Github size={24} />,
    label: 'GitHub',
    value: 'praisi-tech',
    href: 'https://github.com/praisi-tech',
    desc: 'Browse my code',
    color: 'blue',
  },
  {
    id: 'contact-instagram',
    icon: <Instagram size={24} />,
    label: 'Instagram',
    value: 'thruhlens_',
    href: 'https://www.instagram.com/thruhlens_',
    desc: 'Photography & life glimpses',
    color: 'blue',
  },
];

const topics = [
  { icon: <Briefcase size={15} />, label: 'Internship Opportunities' },
  { icon: <Users size={15} />, label: 'Collaboration Projects' },
  { icon: <Shield size={15} />, label: 'Cybersecurity Discussions' },
  { icon: <Globe size={15} />, label: 'Software Engineering' },
  { icon: <BookOpen size={15} />, label: 'Knowledge Exchange' },
  { icon: <Sparkles size={15} />, label: 'New Ideas' },
];

export default function Contact() {
  return (
    <div className="page-wrapper">
      <section className="section contact">
        <div className="container">
          {/* Header */}
          <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Get In Touch</span>
            <h1 className="section-title">Let's <span className="gradient-text">Connect</span></h1>
            <p className="section-subtitle">
              I'm always open to discussing technology, cybersecurity, software engineering, internships, collaborations, and new opportunities. Feel free to reach out.
            </p>
          </motion.div>

          <div className="contact__grid">
            {/* Left: message */}
            <motion.div
              className="contact__left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact__intro card">
                <div className="contact__intro-avatar">
                  <span>PA</span>
                </div>
                <div>
                  <h2 className="contact__intro-name">Praisilia Anastasya</h2>
                  <p className="contact__intro-role">Software Engineer · Cybersecurity Enthusiast</p>
                  <p className="contact__intro-status">
                    <span className="contact__status-dot" /> Currently available for opportunities
                  </p>
                </div>
              </div>

              <div className="contact__topics card">
                <h3 className="contact__topics-title">Open to discussing:</h3>
                <div className="contact__topics-list">
                  {topics.map((t, i) => (
                    <span key={i} className="contact__topic">
                      {t.icon}
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: channels */}
            <motion.div
              className="contact__channels"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {contacts.map((c, i) => (
                <motion.a
                  key={c.id}
                  id={c.id}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`contact-channel card contact-channel--${c.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, x: 4 }}
                >
                  <div className={`contact-channel__icon contact-channel__icon--${c.color}`}>
                    {c.icon}
                  </div>
                  <div className="contact-channel__info">
                    <span className="contact-channel__label">{c.label}</span>
                    <span className="contact-channel__value">{c.value}</span>
                    <span className="contact-channel__desc">{c.desc}</span>
                  </div>
                  <ArrowUpRight size={18} className="contact-channel__arrow" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Footer note */}
          <motion.div
            className="contact__footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>
              Typically responds within 24–48 hours. Looking forward to connecting with you!{' '}
              <Rocket size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4, color: 'var(--accent-emerald)' }} />
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
