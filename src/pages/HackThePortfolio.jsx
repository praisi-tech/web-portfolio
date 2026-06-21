import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Flag, CheckCircle, Lock, Terminal, AlertCircle, ChevronRight, Send, Lightbulb, Trophy, Map, Server, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCTF } from '../context/CTFContext';
import './HackThePortfolio.css';

/* ─── Scrolling Console Log Component ─── */
function LiveSecurityLogs() {
  const [logs, setLogs] = useState([
    '[INIT] Security sandbox initialized...',
    '[OK] Secure connection established with local CTF daemon.',
    '[WARN] Integrity audit pending: 4 active modules.',
    '[SEC] Port 443 actively listening for credentials.',
  ]);

  useEffect(() => {
    const alertTemplates = [
      '[OK] Flag hash checksum validated.',
      '[WARN] Unauthorized recon sweep from: ' + Math.floor(Math.random() * 254 + 1) + '.' + Math.floor(Math.random() * 254 + 1) + '.4.21',
      '[SEC] Cryptographic key renegotiation: AES-256-GCM enabled.',
      '[ALERT] Raw payload analysis completed: clean signature.',
      '[OK] Local session verified. Secure tokens loaded.',
      '[ALERT] SQL parameter injection attempt blocked on query node.',
      '[WARN] Response delay: 14ms. Network conditions nominal.',
      '[SEC] Integrity check passed: 0 vulnerabilities found.',
    ];

    const timer = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, alertTemplates[Math.floor(Math.random() * alertTemplates.length)]];
        if (next.length > 5) next.shift();
        return next;
      });
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="security-terminal">
      <div className="security-terminal__header">
        <div className="security-terminal__dots">
          <span className="security-terminal__dot red" />
          <span className="security-terminal__dot yellow" />
          <span className="security-terminal__dot green" />
        </div>
        <span className="security-terminal__title">root@praisilia-secops: ~/monitor_ops</span>
      </div>
      <div className="security-terminal__body">
        {logs.map((log, i) => (
          <div key={i} className="security-terminal__line">
            <span className="security-terminal__prompt">#</span> {log}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Challenge 1: Source Code Inspection ─── */
function Challenge1({ done }) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState(null);
  const { submitFlag } = useCTF();

  const handleSubmit = () => {
    const ok = submitFlag('flag1', input);
    setStatus(ok ? 'ok' : 'fail');
  };

  if (done) return <CompletedBadge flag="curiosity_is_the_first_step" />;

  return (
    <div className="challenge-body">
      <p className="challenge-desc">Inspect the HTML source code of the page (F12 or Ctrl+U) and search for a hidden developer comment containing the security flag. Submit it below.</p>
      <div className="challenge-hint card">
        <Lightbulb size={16} style={{ color: '#F59E0B', flexShrink: 0 }} />
        <span>Hint: Developers often place temporary comments in the HTML head section. Look for <code>&lt;!-- FLAG-1: ... --&gt;</code></span>
      </div>
      <div className="challenge-input-row-wrap">
        <div className="challenge-input-row">
          <input
            id="flag1-input"
            type="text"
            className="input input--console"
            placeholder="Enter flag... (e.g. flag{dev_comment_discovered})"
            value={input}
            onChange={e => { setInput(e.target.value); setStatus(null); }}
          />
          <button id="flag1-submit" className="btn btn-primary" onClick={handleSubmit}>
            <Send size={15} /> Submit
          </button>
        </div>
        <span className="challenge-input-help">{'Format: lowercase with underscores (Example: flag{comment_text_found})'}</span>
      </div>
      {status === 'fail' && <div className="challenge-error"><AlertCircle size={16} /> [REJECTED] Invalid token value. Keep investigating the DOM elements!</div>}
    </div>
  );
}

/* ─── Challenge 2: OSINT ─── */
const osintQuestions = [
  { q: 'What organization shaped Praisilia\'s leadership journey?', answer: 'aiesec', placeholder: 'e.g. red cross' },
  { q: 'What agricultural export platform concept is Praisilia building?', answer: 'tana minahasa', placeholder: 'e.g. smart farming' },
  { q: 'What field of study is Praisilia pursuing?', answer: 'information technology', placeholder: 'e.g. computer science' },
];

function Challenge2({ done }) {
  const [answers, setAnswers] = useState(['', '', '']);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(null);
  const { submitFlag } = useCTF();

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = osintQuestions.every((q, i) =>
      answers[i].trim().toLowerCase() === q.answer
    );
    if (allCorrect) {
      submitFlag('flag2', 'flag{aiesec_it_tanaminahasa}');
      setStatus('ok');
    } else {
      setStatus('fail');
    }
  };

  if (done) return <CompletedBadge flag="flag{aiesec_it_tanaminahasa}" />;

  return (
    <div className="challenge-body">
      <p className="challenge-desc">Cross-reference information on the About and Projects pages of this website to answer these intelligence-gathering questions.</p>
      {osintQuestions.map((q, i) => (
        <div key={i} className="osint-question">
          <label className="osint-label">Q{i + 1}: {q.q}</label>
          <input
            id={`osint-q${i + 1}`}
            type="text"
            className={`input input--console ${submitted && answers[i].trim().toLowerCase() !== q.answer ? 'input--error' : ''} ${submitted && answers[i].trim().toLowerCase() === q.answer ? 'input--ok' : ''}`}
            placeholder={q.placeholder}
            value={answers[i]}
            onChange={e => {
              const a = [...answers];
              a[i] = e.target.value;
              setAnswers(a);
              setStatus(null);
              setSubmitted(false);
            }}
          />
          <span className="challenge-input-help">Expected format: lowercase (e.g. {q.placeholder})</span>
        </div>
      ))}
      <div className="challenge-input-row">
        <button id="osint-submit" className="btn btn-primary" onClick={handleSubmit}>
          <Send size={15} /> Validate Answers
        </button>
      </div>
      {status === 'fail' && <div className="challenge-error"><AlertCircle size={16} /> [DENIED] One or more answers are incorrect. Query database and verify profiles.</div>}
    </div>
  );
}

/* ─── Challenge 3: Security Consultant ─── */
const secPhases = [
  {
    title: 'Phase 1 — Log File Diagnostics',
    scenario: 'Multiple failed login attempts are detected from the same IP address before a successful authentication occurs.',
    question: 'What attack technique was used?',
    answer: 'brute force',
    placeholder: 'e.g. port scanning',
  },
  {
    title: 'Phase 2 — Secure Code Review',
    scenario: 'A SQL query is discovered: SELECT * FROM users WHERE username = \'$user_parameter_input\'',
    question: 'What security vulnerability exists?',
    answer: 'sql injection',
    placeholder: 'e.g. cross site scripting',
  },
];

const threatItems = [
  { vuln: 'Remote Code Execution (RCE)', correct: 'Critical' },
  { vuln: 'Broken Authentication / Credential Exposure', correct: 'High' },
  { vuln: 'Cross-Site Request Forgery (CSRF)', correct: 'Medium' },
  { vuln: 'Missing Security Headers', correct: 'Low' },
];

function Challenge3({ done }) {
  const [phase, setPhase] = useState(0);
  const [phaseAnswers, setPhaseAnswers] = useState(['', '']);
  const [threatRatings, setThreatRatings] = useState({ 0: '', 1: '', 2: '', 3: '' });
  const [briefing, setBriefing] = useState('');
  const [errors, setErrors] = useState({});
  const { submitFlag } = useCTF();

  const checkPhase = (idx) => {
    const ok = phaseAnswers[idx].trim().toLowerCase() === secPhases[idx].answer;
    if (!ok) { setErrors(e => ({ ...e, [idx]: true })); return; }
    setErrors(e => ({ ...e, [idx]: false }));
    setPhase(p => p + 1);
  };

  const checkThreat = () => {
    const ok = threatItems.every((t, i) => threatRatings[i] === t.correct);
    if (!ok) { setErrors(e => ({ ...e, threat: true })); return; }
    setErrors(e => ({ ...e, threat: false }));
    setPhase(3);
  };

  const finalize = () => {
    if (briefing.trim().length < 20) { setErrors(e => ({ ...e, brief: true })); return; }
    submitFlag('flag3', 'flag{future_security_consultant}');
    setPhase(4);
  };

  if (done || phase === 4) return <CompletedBadge flag="flag{future_security_consultant}" />;

  return (
    <div className="challenge-body">
      <p className="challenge-desc">Act as an external security consultant for <strong>Acme Corporation</strong>. Complete all 4 phases to report vulnerability signals.</p>

      {/* Phase progress */}
      <div className="phase-progress">
        {['Log Analysis', 'Code Review', 'Threat Priority', 'Executive Brief'].map((p, i) => (
          <div key={i} className={`phase-step ${i <= phase ? 'phase-step--active' : ''} ${i < phase ? 'phase-step--done' : ''}`}>
            <span className="phase-step__num">
              {i < phase ? <CheckCircle size={10} style={{ color: 'var(--accent-emerald)' }} /> : i + 1}
            </span>
            <span className="phase-step__label">{p}</span>
          </div>
        ))}
      </div>

      {phase < 2 && (
        <div className="challenge-phase card">
          <h4 className="phase-title">{secPhases[phase].title}</h4>
          <div className="phase-scenario">{secPhases[phase].scenario}</div>
          {phase === 0 && (
            <div className="log-snippet">
              <div className="log-snippet__header">LOG STREAM DETECTED: /var/log/auth.log</div>
              <pre className="log-snippet__body">
                <code>
{`2026-06-20 02:10:01 [WARN] Failed login: user='admin' src_ip=192.168.1.144
2026-06-20 02:10:03 [WARN] Failed login: user='administrator' src_ip=192.168.1.144
2026-06-20 02:10:05 [WARN] Failed login: user='root' src_ip=192.168.1.144
2026-06-20 02:10:07 [WARN] Failed login: user='guest' src_ip=192.168.1.144
2026-06-20 02:10:09 [INFO] Successful login: user='praisilia' src_ip=192.168.1.144`}
                </code>
              </pre>
            </div>
          )}
          <label className="osint-label">{secPhases[phase].question}</label>
          <div className="challenge-input-row-wrap">
            <div className="challenge-input-row">
              <input
                id={`phase${phase + 1}-input`}
                type="text"
                className="input input--console"
                placeholder={secPhases[phase].placeholder}
                value={phaseAnswers[phase]}
                onChange={e => {
                  const a = [...phaseAnswers];
                  a[phase] = e.target.value;
                  setPhaseAnswers(a);
                  setErrors(err => ({ ...err, [phase]: false }));
                }}
              />
              <button id={`phase${phase + 1}-submit`} className="btn btn-primary" onClick={() => checkPhase(phase)}>
                <ChevronRight size={15} /> Next Phase
              </button>
            </div>
            <span className="challenge-input-help">Expected format: lowercase (e.g. {secPhases[phase].placeholder})</span>
          </div>
          {errors[phase] && <div className="challenge-error"><AlertCircle size={16} /> [WARNING] Diagnosis incorrect. Review security vectors and re-evaluate.</div>}
        </div>
      )}

      {phase === 2 && (
        <div className="challenge-phase card">
          <h4 className="phase-title">Phase 3 — Threat Prioritization</h4>
          <p className="challenge-desc" style={{ marginBottom: 16 }}>Classify each identified vulnerability by standard severity matrix (Critical / High / Medium / Low).</p>
          {threatItems.map((t, i) => (
            <div key={i} className="threat-row">
              <span className="threat-vuln">{t.vuln}</span>
              <select
                id={`threat-select-${i}`}
                className="input threat-select"
                value={threatRatings[i]}
                onChange={e => setThreatRatings(r => ({ ...r, [i]: e.target.value }))}
              >
                <option value="">Select severity...</option>
                {['Critical', 'High', 'Medium', 'Low'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
          <button id="threat-submit" className="btn btn-primary" onClick={checkThreat} style={{ marginTop: 12 }}>
            Submit Assessment
          </button>
          {errors.threat && <div className="challenge-error"><AlertCircle size={16} /> [ERROR] Risk alignment mismatched. Criticality values do not conform to CVSS.</div>}
        </div>
      )}

      {phase === 3 && (
        <div className="challenge-phase card">
          <h4 className="phase-title">Phase 4 — Executive Security Briefing</h4>
          <p className="challenge-desc">Write an audit report summarizing findings, immediate risk potential, and recommended actions.</p>
          <textarea
            id="briefing-input"
            className="input input--console"
            placeholder="Write report... (minimum 20 characters)"
            value={briefing}
            onChange={e => { setBriefing(e.target.value); setErrors(err => ({ ...err, brief: false })); }}
            rows={6}
          />
          <span className="challenge-input-help">
            Example: Findings Summary: Missing secure headers. Risk Assessment: Medium severity. Recommended Action: Enable strict transport security.
          </span>
          <button id="briefing-submit" className="btn btn-primary" onClick={finalize} style={{ marginTop: 12 }}>
            <Send size={15} /> Submit Report & Claim Flag
          </button>
          {errors.brief && <div className="challenge-error"><AlertCircle size={16} /> [REJECTED] Report too short. Provide sufficient detail for executive review.</div>}
        </div>
      )}
    </div>
  );
}

/* ─── Completed Badge ─── */
function CompletedBadge({ flag }) {
  return (
    <div className="completed-badge">
      <CheckCircle size={24} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
      <div>
        <p className="completed-badge__title">FLAG CAPTURED &amp; SECURED</p>
        <code className="completed-badge__flag">{flag}</code>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function HackThePortfolio() {
  const { ctfState, flagCount, isComplete } = useCTF();
  const [openChallenge, setOpenChallenge] = useState(null);

  const challenges = [
    { id: 1, key: 'flag1', title: 'Challenge #1 — Source Code Inspection', desc: 'Examine the page source to find a hidden developer comment.', category: 'Web Recon', Component: Challenge1 },
    { id: 2, key: 'flag2', title: 'Challenge #2 — Open Source Intelligence (OSINT)', desc: 'Gather intelligence from the portfolio to answer investigative questions.', category: 'OSINT', Component: Challenge2 },
    { id: 3, key: 'flag3', title: 'Challenge #3 — Security Consultant Simulation', desc: 'Complete a 4-phase security audit for a fictional organization.', category: 'Security Simulation', Component: Challenge3 },
  ];

  return (
    <div className="page-wrapper">
      <section className="section hack">
        <div className="container">
          {/* Header */}
          <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label">Interactive CTF</span>
            <h1 className="section-title">
              Hack The <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="section-subtitle">Think like a security consultant. Solve like an engineer. Uncover digital signals, solve challenges, and unlock the final completion credentials.</p>
          </motion.div>

          {/* Status panel */}
          <motion.div className="hack-status card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="hack-status__header">
              <Terminal size={20} />
              <span>Operational Status</span>
            </div>
            <p className="hack-status__subtitle">Your Discovered Security Tokens: <strong>{flagCount}/3</strong></p>
            <div className="hack-flags">
              {challenges.map((c, i) => (
                <div key={i} className={`hack-flag ${ctfState.flags[c.key] ? 'hack-flag--captured' : ''}`}>
                  <Flag size={16} />
                  <span>FLAG {i + 1}</span>
                  <span className="hack-flag__status" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {ctfState.flags[c.key] ? (
                      <>Secured <CheckCircle size={12} style={{ color: 'var(--accent-emerald)', display: 'inline' }} /></>
                    ) : (
                      'Unsecured'
                    )}
                  </span>
                </div>
              ))}
            </div>

            {isComplete ? (
              <div className="hack-complete">
                <CheckCircle size={20} />
                <div>
                  <p className="hack-complete__title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Trophy size={16} style={{ color: 'gold' }} /> All Flags Captured!
                  </p>
                  <div className="hack-complete__links">
                    <Link to="/secret-journey" id="link-secret" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Map size={14} /> Secret Journey
                    </Link>
                    <Link to="/certificate-claim" id="link-cert" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Trophy size={14} /> Claim Certificate
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <p className="hack-status__hint">
                Need more hints? <Link to="/contact">→ Contact me</Link>
              </p>
            )}
          </motion.div>

          {/* Challenge overview */}
          <motion.div className="hack-overview card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="hack-overview__title">Security Challenge Documentation</h2>
            <p className="hack-overview__desc">The Security Challenge is an interactive Capture The Flag (CTF) experience embedded within this portfolio. It simulates real-world cybersecurity thinking — web security analysis, OSINT, and security consulting. Discover and submit all 3 flags to unlock exclusive content and a completion certificate.</p>
          </motion.div>

          {/* Challenges */}
          <div className="hack-challenges">
            {challenges.map((challenge, i) => {
              const done = ctfState.flags[challenge.key];
              const isOpen = openChallenge === challenge.id;

              return (
                <motion.div
                  key={challenge.id}
                  className={`hack-challenge card ${done ? 'hack-challenge--done' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                >
                  <div className="hack-challenge__header" onClick={() => setOpenChallenge(isOpen ? null : challenge.id)}>
                    <div className="hack-challenge__left">
                      <div className={`hack-challenge__icon ${done ? 'hack-challenge__icon--done' : ''}`}>
                        {done ? <CheckCircle size={20} /> : <Lock size={20} />}
                      </div>
                      <div>
                        <div className="hack-challenge__meta">
                          <span className="badge">{challenge.category}</span>
                          {done && <span className="badge" style={{ background: 'rgba(16,217,168,0.15)', color: 'var(--accent-emerald)' }}>Completed</span>}
                        </div>
                        <h3 className="hack-challenge__title">{challenge.title}</h3>
                        <p className="hack-challenge__desc">{challenge.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className={`hack-challenge__chevron ${isOpen ? 'hack-challenge__chevron--open' : ''}`} />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="hack-challenge__body"
                        key={challenge.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <challenge.Component done={done} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
