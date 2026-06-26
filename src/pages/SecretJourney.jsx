import { motion } from 'framer-motion';
import { Navigate, Link } from 'react-router-dom';
import { useCTF } from '../context/CTFContext';
import {
  BookOpen, Star, Lightbulb, Trophy, ArrowRight,
  Lock, Code, Shield, Cpu, Sprout, Repeat, Users, Sparkles, Heart,
  Brain, Coins
} from 'lucide-react';
import './SecretJourney.css';

const bookIcons = {
  Productivity: <Repeat size={20} />,
  Leadership: <Users size={20} />,
  'Personal Growth': <Sprout size={20} />,
  Communication: <Sparkles size={20} />,
  'Self-Discovery': <Heart size={20} />,
  Philosophy: <Lightbulb size={20} />,
  'Critical Thinking': <Brain size={20} />,
  'Finance & Business': <Coins size={20} />,
};

const books = [
  {
    title: 'Makanya Mikir',
    author: 'Henry Manampiring',
    category: 'Critical Thinking',
    description: 'An Indonesian guide to critical thinking, cognitive biases, and logical fallacies to build objective reasoning skills.'
  },
  {
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    category: 'Philosophy',
    description: 'An Indonesian guide introducing Stoicism (Stoa philosophy) to build mental resilience and stay calm in chaos.'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Productivity',
    description: 'Teaches the power of making tiny 1% daily improvements to build life-changing habits.'
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    category: 'Personal Growth',
    description: 'A timeless guide to solving personal and professional problems based on core universal principles.'
  },
  {
    title: 'The Magic of Thinking Big',
    author: 'David J. Schwartz',
    category: 'Personal Growth',
    description: 'Teaches the power of setting high goals and believing in oneself to achieve outstanding personal and career success.'
  },
  {
    title: 'Start with Why',
    author: 'Simon Sinek',
    category: 'Leadership',
    description: 'Explains how the most influential leaders inspire action by focusing on the "Why" before the "How" and "What".'
  },
  {
    title: 'How to Win Friends and Influence People',
    author: 'Dale Carnegie',
    category: 'Communication',
    description: 'Provides practical, legendary advice on how to build relationships, communicate effectively, and inspire trust.'
  },
  {
    title: 'Cashflow Quadrant',
    author: 'Robert T. Kiyosaki',
    category: 'Finance & Business',
    description: 'Details the four categories of income generation: Employee, Self-Employed, Business Owner, and Investor.'
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    category: 'Finance & Business',
    description: 'Introduces fundamental concepts of financial literacy, asset building, and the mindset shift from employee to investor.'
  },
  {
    title: 'You Do You',
    author: 'Fellexandro Ruby',
    category: 'Self-Discovery',
    description: 'A modern guide to understanding your strengths, managing finances, and navigating life through self-experiments.'
  },
];

const secrets = [
  { icon: <Sprout size={20} />, title: 'Start with curiosity', body: 'Every breakthrough started with a simple "why?" or "how?". Never stop asking questions, that childlike curiosity is your most powerful tool!' },
  { icon: <Repeat size={20} />, title: 'Embrace the iteration cycle', body: 'The best version of any project, skill, or idea rarely appears on the first try. Build, reflect, improve, repeat endlessly and without ego.' },
  { icon: <Users size={20} />, title: 'Community accelerates growth', body: 'Every writeup shared, every question answered in a forum, every open-source contribution compounds into a network of trust and shared knowledge that no solo effort can match.' },
  { icon: <Shield size={20} />, title: 'Security is a mindset, not a feature', body: 'You don\'t add security at the end, you build with it from the first line. Every system you design, ask: "How could this break?" before asking "How does this work?"' },
  { icon: <BookOpen size={20} />, title: 'Document everything', body: 'Your best learning asset is your own documentation. Future-you will thank present-you for every note taken, every solution written down, every lesson captured.' },
  { icon: <Sparkles size={20} />, title: 'Build real things', body: 'Tutorial projects teach syntax, real projects teach problem-solving. Ship things. Break things. Fix things. The learning is in the friction.' },
];

export default function SecretJourney() {
  const { isComplete } = useCTF();

  if (!isComplete) return <Navigate to="/hack" replace />;

  return (
    <div className="page-wrapper">
      <section className="section secret">
        <div className="container">
          {/* Header */}
          <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label secret-label">🔓 Unlocked</span>
            <h1 className="section-title">My Secret <span className="gradient-text">Journey</span></h1>
            <p className="section-subtitle">You earned it. Here's an honest look behind the portfolio. The mindset, the books, and the insights that shaped me.</p>
          </motion.div>

          {/* Behind the Portfolio */}
          <motion.div className="secret-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="secret-section__header">
              <Lightbulb size={22} />
              <h2>My Secrets to Success</h2>
            </div>
            <div className="secret-grid">
              {secrets.map((s, i) => (
                <motion.div
                  key={i}
                  className="secret-card card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <div className="secret-card__icon-wrap">{s.icon}</div>
                  <h3 className="secret-card__title">{s.title}</h3>
                  <p className="secret-card__body">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Books */}
          <motion.div className="secret-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="secret-section__header">
              <BookOpen size={22} />
              <h2>Book Recommendations</h2>
            </div>
            <div className="books-grid">
              {books.map((book, i) => (
                <motion.div
                  key={i}
                  className="book-card card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.07 }}
                >
                  <div className="book-card__icon-wrap">
                    {bookIcons[book.category]}
                  </div>
                  <div>
                    <p className="book-card__title">{book.title}</p>
                    <p className="book-card__author">by {book.author}</p>
                    <p className="book-card__desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', marginBottom: '8px', lineHeight: '1.5' }}>
                      {book.description}
                    </p>
                    <span className="badge">{book.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Behind the Portfolio */}
          <motion.div className="secret-behind card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Star size={24} />
            <div>
              <h2>Behind This Portfolio</h2>
              <p>This portfolio is more than a showcase, it's a live system. The CTF challenges embedded within it reflect my belief that portfolios should <em>demonstrate</em> skills, not just describe them. The particle background, the typewriter effect, and name and certificate system, each piece was a deliberate choice to make something memorable.</p>
              <p style={{ marginTop: 12 }}>The secret journey you've unlocked represents my philosophy: the most interesting paths are the ones that require effort to discover.</p>
              <p style={{ marginTop: 12 }}>
                Thank you for playing.{' '}
                <Heart size={15} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4, color: 'var(--accent-emerald)', fill: 'var(--accent-emerald)' }} />
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div className="secret-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Link to="/certificate-claim" id="secret-to-cert" className="btn btn-primary btn-lg">
              <Trophy size={18} /> Claim Your Completion Certificate <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
