import { motion } from 'framer-motion';
import {
  Code, Shield, Users, BookOpen, Cpu, Globe, Terminal, Database, MapPin, GraduationCap, Heart,
  ShieldCheck, KeyRound, FileWarning, FileCheck, Network, Router, Cable, Server,
  UserCheck, Handshake, FileText, TrendingUp, Mic, Volume2, MessageSquare, Presentation, Calendar,
  Search, Wifi, Trophy, Activity, Lock, Key, Fingerprint, Monitor, Percent, FolderOpen,
  Sparkles, Brain, Workflow
} from 'lucide-react';
import { useImagePreview } from '../context/ImagePreviewContext';
import './About.css';

const lucidePillIcons = {
  Database: <Database size={13} />,
  Cpu: <Cpu size={13} />,
  Terminal: <Terminal size={13} />,
  Trophy: <Trophy size={13} />,
  ShieldCheck: <ShieldCheck size={13} />,
  Activity: <Activity size={13} />,
  Search: <Search size={13} />,
  FileText: <FileText size={13} />,
  KeyRound: <KeyRound size={13} />,
  Lock: <Lock size={13} />,
  Key: <Key size={13} />,
  Fingerprint: <Fingerprint size={13} />,
  FileWarning: <FileWarning size={13} />,
  FileCheck: <FileCheck size={13} />,
  Router: <Router size={13} />,
  Monitor: <Monitor size={13} />,
  Network: <Network size={13} />,
  Server: <Server size={13} />,
  Globe: <Globe size={13} />,
  Cable: <Cable size={13} />,
  Shield: <Shield size={13} />,
  Percent: <Percent size={13} />,
  Wifi: <Wifi size={13} />,
  FolderOpen: <FolderOpen size={13} />,
  Users: <Users size={13} />,
  UserCheck: <UserCheck size={13} />,
  TrendingUp: <TrendingUp size={13} />,
  Handshake: <Handshake size={13} />,
  Calendar: <Calendar size={13} />,
  Mic: <Mic size={13} />,
  Volume2: <Volume2 size={13} />,
  Presentation: <Presentation size={13} />,
  Sparkles: <Sparkles size={13} />,
  Brain: <Brain size={13} />,
  Workflow: <Workflow size={13} />
};

const skillCategories = [
  {
    title: 'Software Engineering',
    icon: <Code size={24} />,
    description: 'Building secure, high-performance web and mobile applications with modern frameworks and reliable backends.',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', type: 'url' },
      { name: 'Next.js (14-16)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', type: 'url' },
      { name: 'React 19', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', type: 'url' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', type: 'url' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', type: 'url' },
      { name: 'Go (Golang)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', type: 'url' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', type: 'url' },
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', type: 'url' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', type: 'url' },
      { name: 'Android SDK', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', type: 'url' },
      { name: 'Room Database', icon: 'Database', type: 'lucide' },
      { name: 'REST APIs', icon: 'Cpu', type: 'lucide' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', type: 'url' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', type: 'url' },
      { name: 'Firebase / Firestore', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg', type: 'url' },
      { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', type: 'url' },
      { name: 'Google Gemini AI', icon: 'Sparkles', type: 'lucide' },
      { name: 'Groq Llama 70B', icon: 'Brain', type: 'lucide' },
      { name: 'RAG (Retrieval-Augmented Generation)', icon: 'Workflow', type: 'lucide' }
    ],
    color: 'emerald'
  },
  {
    title: 'Cybersecurity',
    icon: <ShieldCheck size={24} />,
    description: 'Identifying vulnerabilities, performing defensive security operations, and engineering cryptographic protections.',
    skills: [
      { name: 'Ethical Hacking', icon: 'Terminal', type: 'lucide' },
      { name: 'CTF Player', icon: 'Trophy', type: 'lucide' },
      { name: 'Web Security', icon: 'ShieldCheck', type: 'lucide' },
      { name: 'Penetration Testing', icon: 'Activity', type: 'lucide' },
      { name: 'Kali Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', type: 'url' },
      { name: 'Digital Forensics', icon: 'Search', type: 'lucide' },
      { name: 'Incident Response', icon: 'Activity', type: 'lucide' },
      { name: 'Evidence Analysis', icon: 'FileText', type: 'lucide' },
      { name: 'Autopsy', icon: 'Search', type: 'lucide' },
      { name: 'AES-256-GCM', icon: 'KeyRound', type: 'lucide' },
      { name: 'HMAC-SHA256', icon: 'Lock', type: 'lucide' },
      { name: 'Argon2id', icon: 'Key', type: 'lucide' },
      { name: 'JWT (RS256)', icon: 'Fingerprint', type: 'lucide' },
      { name: 'OWASP Top 10', icon: 'FileWarning', type: 'lucide' },
      { name: 'ISO 27001', icon: 'FileCheck', type: 'lucide' }
    ],
    color: 'crimson'
  },
  {
    title: 'Network & System Infrastructure',
    icon: <Network size={24} />,
    description: 'Designing, configuring, and administering enterprise servers and secure routing topologies.',
    skills: [
      { name: 'Debian Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg', type: 'url' },
      { name: 'MikroTik RouterOS', icon: 'Router', type: 'lucide' },
      { name: 'Winbox', icon: 'Monitor', type: 'lucide' },
      { name: 'Cisco Packet Tracer', icon: 'Network', type: 'lucide' },
      { name: 'Network Topology', icon: 'Network', type: 'lucide' },
      { name: 'LAN Administration', icon: 'Server', type: 'lucide' },
      { name: 'DHCP & DNS', icon: 'Globe', type: 'lucide' },
      { name: 'TCP/IP', icon: 'Cable', type: 'lucide' },
      { name: 'NAT & Firewalls', icon: 'Shield', type: 'lucide' },
      { name: 'Static Routing', icon: 'Router', type: 'lucide' },
      { name: 'VLSM', icon: 'Percent', type: 'lucide' },
      { name: 'Wireless Networking', icon: 'Wifi', type: 'lucide' },
      { name: 'Apache2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg', type: 'url' },
      { name: 'Samba File Sharing', icon: 'FolderOpen', type: 'lucide' }
    ],
    color: 'blue'
  },
  {
    title: 'Leadership & Communication',
    icon: <Users size={24} />,
    description: 'Leading student organizations, managing partnerships, and presenting technical ideas clearly.',
    skills: [
      { name: 'Talent Management', icon: 'Users', type: 'lucide' },
      { name: 'HRIS Tools', icon: 'UserCheck', type: 'lucide' },
      { name: 'B2B Business Development', icon: 'TrendingUp', type: 'lucide' },
      { name: 'Partnerships', icon: 'Handshake', type: 'lucide' },
      { name: 'Proposal Writing', icon: 'FileText', type: 'lucide' },
      { name: 'Event Management', icon: 'Calendar', type: 'lucide' },
      { name: 'Master of Ceremonies', icon: 'Mic', type: 'lucide' },
      { name: 'Public Speaking', icon: 'Volume2', type: 'lucide' },
      { name: 'English Presentation', icon: 'Presentation', type: 'lucide' }
    ],
    color: 'purple'
  }
];

const stats = [
  { value: '9+', label: 'Projects Built' },
  { value: '20+', label: 'Tools Mastered' },
  { value: '5+', label: 'Certifications' },
  { value: '2+', label: 'Years Experience' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const { openPreview } = useImagePreview();
  return (
    <div className="page-wrapper">
      <section className="section about">
        <div className="container">

          {/* ── HERO: Portrait + Intro ── */}
          <motion.div
            className="about__hero"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Portrait */}
            <motion.div
              className="about__portrait-wrap"
              variants={fadeUp}
              style={{ cursor: 'zoom-in' }}
              onClick={() => openPreview('/profile/about-foto.webp', 'Praisilia Anastasya', 'Praisilia Anastasya', 'Software Engineer & Cybersecurity Enthusiast')}
            >
              <div className="about__portrait-ring" />
              <img
                src="/profile/about-foto.webp"
                alt="Praisilia Anastasya"
                className="about__portrait"
              />
              {/* Status badge */}
              <div className="about__portrait-badge">
                <span className="about__badge-dot" />
                Open to opportunities
              </div>
            </motion.div>

            {/* Intro text */}
            <motion.div className="about__intro" variants={fadeUp}>
              <span className="section-label">About Me</span>
              <h1 className="section-title about__hero-title">
                About <span className="gradient-text">Praisilia</span>
              </h1>

              <div className="about__meta-row">
                <span className="about__meta-item">
                  <MapPin size={14} /> President University, Indonesia
                </span>
                <span className="about__meta-item">
                  <GraduationCap size={14} /> Information Technology
                </span>
                <span className="about__meta-item">
                  <Heart size={14} /> Security &amp; Engineering
                </span>
              </div>

              <p className="about__tagline">
                Software engineer and cybersecurity enthusiast who builds secure, impactful digital products.
              </p>

              <p className="about__body-text">
                I'm an Information Technology student from President University, Indonesia, with a deep passion
                for software engineering and cybersecurity. My journey started from curiosity about how systems work.
                How they can be built, broken, and secured and has since evolved into hands-on experience in both worlds.
              </p>
              <p className="about__body-text">
                I've led tech teams, participated in competitions, and built projects that solve real-world problems. I believe great technology sits at the intersection of strong engineering, thoughtful design, and security-first thinking.
              </p>
              <p className="about__body-text">
                When I'm not coding or chasing flags, you'll find me mentoring other developers, operating export business, or helping other people to grow through MC-ing or public speaking. I am driven by the belief that technology built with integrity
                creates lasting value.
              </p>
            </motion.div>
          </motion.div>

          {/* ── STATS ── */}
          <motion.div
            className="about__stats-row"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="about__stat card"
                variants={fadeUp}
              >
                <span className="about__stat-value gradient-text">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── SKILLS ── */}
          <motion.div
            className="about__skills-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-header" style={{ marginBottom: 40 }}>
              <span className="section-label">Skills &amp; Expertise</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Capabilities &amp; Tech Stack</h2>
            </div>

            <div className="skills-cat-grid">
              {skillCategories.map((cat, idx) => (
                <motion.div
                  key={cat.title}
                  className="skills-cat-card card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <div className={`skills-cat-header skills-cat-header--${cat.color}`}>
                    <div className="skills-cat-icon">{cat.icon}</div>
                    <h3 className="skills-cat-title">{cat.title}</h3>
                  </div>
                  <p className="skills-cat-desc">{cat.description}</p>
                  <div className="skills-cat-tags">
                    {cat.skills.map(s => (
                      <span key={s.name} className={`skill-tag skill-tag--${cat.color}`}>
                        <span className="skill-tag__icon">
                          {s.type === 'url' ? (
                            <img src={s.icon} alt={s.name} />
                          ) : (
                            lucidePillIcons[s.icon] || <Code size={13} />
                          )}
                        </span>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
