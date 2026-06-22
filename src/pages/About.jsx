import { motion } from 'framer-motion';
import {
  Code, Shield, Users, BookOpen, Cpu, Globe, Terminal, Database, MapPin, GraduationCap, Heart,
  ShieldCheck, KeyRound, FileWarning, FileCheck, Network, Router, Cable, Server,
  UserCheck, Handshake, FileText, TrendingUp, Mic, Volume2, MessageSquare, Presentation, Calendar
} from 'lucide-react';
import './About.css';

const lucideIcons = {
  ShieldCheck: <ShieldCheck size={20} />,
  KeyRound: <KeyRound size={20} />,
  Terminal: <Terminal size={20} />,
  FileWarning: <FileWarning size={20} />,
  FileCheck: <FileCheck size={20} />,
  Network: <Network size={20} />,
  Router: <Router size={20} />,
  Cable: <Cable size={20} />,
  Server: <Server size={20} />,
  Users: <Users size={20} />,
  UserCheck: <UserCheck size={20} />,
  Handshake: <Handshake size={20} />,
  FileText: <FileText size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  Mic: <Mic size={20} />,
  Volume2: <Volume2 size={20} />,
  MessageSquare: <MessageSquare size={20} />,
  Presentation: <Presentation size={20} />,
  Calendar: <Calendar size={20} />,
  Cpu: <Cpu size={20} />,
  Globe: <Globe size={20} />
};

const row1Skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', type: 'url' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', type: 'url' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', type: 'url' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', type: 'url' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', type: 'url' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', type: 'url' },
  { name: 'Go (Golang)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', type: 'url' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', type: 'url' },
  { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', type: 'url' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', type: 'url' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', type: 'url' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', type: 'url' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg', type: 'url' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', type: 'url' },
  { name: 'REST APIs', icon: 'Cpu', type: 'lucide' },
];

const row2Skills = [
  { name: 'Web Security', icon: 'ShieldCheck', type: 'lucide' },
  { name: 'AES-256-GCM', icon: 'KeyRound', type: 'lucide' },
  { name: 'Ethical Hacking', icon: 'Terminal', type: 'lucide' },
  { name: 'OWASP Top 10', icon: 'FileWarning', type: 'lucide' },
  { name: 'ISO 27001', icon: 'FileCheck', type: 'lucide' },
  { name: 'Cisco Packet Tracer', icon: 'Network', type: 'lucide' },
  { name: 'MikroTik', icon: 'Router', type: 'lucide' },
  { name: 'TCP/IP', icon: 'Cable', type: 'lucide' },
  { name: 'DHCP/DNS', icon: 'Globe', type: 'lucide' },
  { name: 'LAN Administration', icon: 'Server', type: 'lucide' },
];

const row3Skills = [
  { name: 'Talent Management', icon: 'Users', type: 'lucide' },
  { name: 'HRIS Tools', icon: 'UserCheck', type: 'lucide' },
  { name: 'Partnerships', icon: 'Handshake', type: 'lucide' },
  { name: 'Proposal Writing', icon: 'FileText', type: 'lucide' },
  { name: 'B2B Business Development', icon: 'TrendingUp', type: 'lucide' },
  { name: 'Master of Ceremonies', icon: 'Mic', type: 'lucide' },
  { name: 'Public Speaking', icon: 'Volume2', type: 'lucide' },
  { name: 'Speech Instruction', icon: 'MessageSquare', type: 'lucide' },
  { name: 'English Presentation', icon: 'Presentation', type: 'lucide' },
  { name: 'Event Management', icon: 'Calendar', type: 'lucide' },
];

function SkillItem({ skill }) {
  return (
    <div className="marquee-item">
      <div className="marquee-item__icon">
        {skill.type === 'url' ? (
          <img src={skill.icon} alt={skill.name} />
        ) : (
          lucideIcons[skill.icon] || <Code size={20} />
        )}
      </div>
      <span>{skill.name}</span>
    </div>
  );
}

function MarqueeRow({ skills, direction = 'left' }) {
  return (
    <div className="marquee-row">
      <div className={`marquee-track marquee-track--${direction}`}>
        <div className="marquee-content">
          {skills.map((s, idx) => <SkillItem key={idx} skill={s} />)}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {skills.map((s, idx) => <SkillItem key={`dup-${idx}`} skill={s} />)}
        </div>
      </div>
    </div>
  );
}

const stats = [
  { value: '9+', label: 'Projects Built' },
  { value: '5+', label: 'Certifications' },
  { value: '2+', label: 'Years Experience' },
  { value: '15+', label: 'Happy Clients' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
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
            <motion.div className="about__portrait-wrap" variants={fadeUp}>
              <div className="about__portrait-ring" />
              <img
                src="/profile/about-foto.png"
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
                When I'm not coding or chasing flags, you'll find me mentoring junior developers, operating export business, or helping other people to grow through MC-ing or public speaking. I am driven by the belief that technology built with integrity
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
              <h2 className="section-title" style={{ fontSize: '2rem' }}>What I work with</h2>
            </div>

            <div className="marquee-container">
              <MarqueeRow skills={row1Skills} direction="left" />
              <MarqueeRow skills={row2Skills} direction="right" />
              <MarqueeRow skills={row3Skills} direction="left" />
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
