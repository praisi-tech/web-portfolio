import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useCTF } from '../context/CTFContext';
import { Trophy, Download, AlertCircle } from 'lucide-react';
import './CertificateClaim.css';

/* ─── Certificate background SVG ─────────────────────────────────────────────
   One SVG covers the entire A4 landscape area (viewBox 0 0 297 210).
   Coordinates map 1:1 to millimetres since the card has the same aspect ratio.
   ─────────────────────────────────────────────────────────────────────────── */
function CertBackground() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      viewBox="0 0 297 210"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── 1. Outer dark navy frame (full bleed background) ── */}
      <rect width="297" height="210" fill="#1E3A8A" />

      {/* ── 2. White inner content area ── */}
      <rect x="21" y="13" width="255" height="184" fill="#FFFFFF" />

      {/* ── 3. Corner diagonal accent shapes ─────────────────────────────────
              Rendered after white rect so they appear on top at corners        */}

      {/* Bottom-left — primary large shape */}
      <polygon points="0,210 0,110 76,210" fill="#1A50C8" />
      {/* Bottom-left — inner brighter accent */}
      <polygon points="0,210 0,152 46,210" fill="#2563EB" />

      {/* Top-right — mirror of bottom-left */}
      <polygon points="297,0 297,100 221,0" fill="#1A50C8" />
      {/* Top-right — inner brighter accent */}
      <polygon points="297,0 297,58 251,0" fill="#2563EB" />

      {/* Top-left — small balance element */}
      <polygon points="0,0 46,0 0,33" fill="#1A50C8" />

      {/* Bottom-right — small balance element */}
      <polygon points="297,210 297,177 254,210" fill="#1A50C8" />

      {/* ── 4. Thin inner border rectangle (rendered on top of shapes) ── */}
      <rect x="26" y="18" width="245" height="174"
        fill="none" stroke="#1A50C8" strokeWidth="1.2" />
    </svg>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function CertificateClaim() {
  const { isComplete, ctfState, claimCertificate } = useCTF();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(() => {
    if (ctfState.claimedName) {
      return { name: ctfState.claimedName, date: ctfState.claimedDate };
    }
    return null;
  });
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef(null);

  // Load certificate fonts dynamically when this page is loaded
  useEffect(() => {
    const fontLinkId = 'cert-google-fonts';
    if (!document.getElementById(fontLinkId)) {
      const link = document.createElement('link');
      link.id = fontLinkId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Mitigation: Security Logging & Alerting + Broken Access Control audit visibility
  useEffect(() => {
    if (!isComplete) {
      console.error(`[SECURITY AUDIT] Access Denied: Unauthorized routing attempt to CertificateClaim page. IP/session flagged. Timestamp: ${new Date().toISOString()}`);
    }
  }, [isComplete]);

  if (!isComplete) return <Navigate to="/hack" replace />;

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);

    if (!val.trim()) {
      setError('');
      return;
    }

    // Check characters
    const allowedCharsRegex = /^[a-zA-Z\s'-]+$/;
    if (!allowedCharsRegex.test(val)) {
      setError("Name can only contain letters, spaces, hyphens, and apostrophes.");
      return;
    }

    // Check word capitalization
    const words = val.split(/[\s-]+/);
    const isCapitalized = words.every(word => {
      if (!word) return true;
      const firstChar = word.charAt(0);
      return firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
    });

    if (!isCapitalized) {
      setError("Each word must start with a capital letter (e.g., Jane Doe).");
      return;
    }

    setError('');
  };

  const handleGenerate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    // Check characters
    const allowedCharsRegex = /^[a-zA-Z\s'-]+$/;
    if (!allowedCharsRegex.test(trimmed)) {
      setError("Name can only contain letters, spaces, hyphens, and apostrophes.");
      return;
    }

    // Check word capitalization
    const words = trimmed.split(/[\s-]+/);
    const isCapitalized = words.every(word => {
      if (!word) return true;
      const firstChar = word.charAt(0);
      return firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
    });

    if (!isCapitalized) {
      setError("Each word must start with a capital letter (e.g., Jane Doe).");
      return;
    }

    // Mitigation: Injection & Buffer Overrun / Layout DOS
    if (trimmed.length > 50) {
      alert("Name is too long. Maximum 50 characters allowed for validation and printing.");
      return;
    }

    // Strip HTML to prevent tag injection in rendering canvas
    const sanitized = trimmed.replace(/<[^>]*>/g, '');

    const result = claimCertificate(sanitized);
    if (result) {
      console.warn(`[SECURITY AUDIT] Certificate claim signature generated permanently for: "${sanitized}" at ${new Date().toISOString()}`);
      setGenerated(result);
    }
  };

  /* ── PDF generation ─────────────────────────────────────────────────────── */
  const handleDownload = async () => {
    if (!generated || !certRef.current) return;
    setDownloading(true);
    try {
      // Ensure all custom web fonts ('Cinzel', 'Great Vibes', etc.) are loaded before capture
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // Add temporary class to disable text gradients during rendering
      certRef.current.classList.add('rendering-pdf');

      // Dynamically import heavy libraries only when requested to optimize initial load
      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const html2canvas = html2canvasModule.default;
      const jsPDF = jsPDFModule.jsPDF;

      // Render the cert card element to a high-DPI canvas
      const canvas = await html2canvas(certRef.current, {
        scale: 3, // Premium print resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      // Remove temporary class immediately after rendering
      certRef.current.classList.remove('rendering-pdf');

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

      // Embed the generated high-res screenshot covering the full A4 canvas
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);

      // Check if page is in an iframe or running in the IDE's Electron webview wrapper
      const isIframe = window.self !== window.top;
      const isElectron = /electron/i.test(navigator.userAgent);

      if (isIframe || isElectron) {
        const blobUrl = pdf.output('bloburl');
        window.open(blobUrl, '_blank');
      } else {
        pdf.save(`CTF-Certificate-${generated.name.replace(/\s+/g, '-')}.pdf`);
      }
    } catch (e) {
      console.error('PDF error:', e);
      alert('PDF generation failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="section cert-claim-page">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Trophy size={12} /> Reward
            </span>
            <h1 className="section-title">Claim Your <span className="gradient-text">Certificate</span></h1>
            <p className="section-subtitle">You completed all 3 security challenges. Generate your personalized completion certificate below.</p>
          </motion.div>

          <motion.div
            className="cert-claim-card card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="cert-claim-card__header">
              <Trophy size={24} />
              <div>
                <h2>Certificate Generator</h2>
                <p>Enter your name to generate a personalized certificate of completion.</p>
              </div>
            </div>

            {!generated ? (
              <div className="cert-claim-form">
                <div>
                  <label className="cert-claim-label">Your Full Name</label>
                  <input
                    id="cert-name-input"
                    type="text"
                    className={`input ${error ? 'input--error' : ''}`}
                    placeholder="Enter your name..."
                    autoComplete="name"
                    maxLength={50}
                    value={name}
                    onChange={handleNameChange}
                    onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                  />
                  {error ? (
                    <p className="cert-claim-error" style={{
                      color: '#EF4444',
                      fontSize: '0.8rem',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <AlertCircle size={14} />
                      {error}
                    </p>
                  ) : (
                    <p className="cert-claim-warning" style={{
                      color: name.trim() ? '#F59E0B' : 'var(--text-muted)',
                      fontSize: '0.8rem',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color var(--transition)'
                    }}>
                      <AlertCircle size={14} />
                      Attention: You can only generate this certificate ONCE. Make sure your name is spelled correctly as it cannot be changed.
                    </p>
                  )}
                </div>
                <button
                  id="cert-generate-btn"
                  className="btn btn-primary btn-lg"
                  onClick={handleGenerate}
                  disabled={!name.trim() || !!error}
                >
                  <Trophy size={18} /> Generate Certificate
                </button>
              </div>
            ) : (
              <motion.div className="cert-preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>

                {/* ─── Certificate Card ─── */}
                <div className="cert-preview__card" ref={certRef}>

                  {/* Full-card SVG background with parallelogram decorations */}
                  <CertBackground />

                  {/* Main Content */}
                  <div className="cert-content">
                    <h1 className="cert-title">Certificate</h1>
                    <p className="cert-subtitle">of Completion</p>
                    <p className="cert-certifies">This Certifies that</p>
                    <h2 className="cert-name">{generated.name}</h2>
                    <div className="cert-name-divider" />
                    <p className="cert-completed-text">has successfully completed the</p>
                    <p className="cert-challenge-title">Hack The Portfolio &#8212; Security Challenge.</p>
                    <p className="cert-desc">
                      by discovering all three hidden flags through web security analysis, OSINT
                      investigation, and a multi-phase security consultant simulation.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="cert-footer">
                    <div className="cert-footer__item">
                      <span className="cert-footer__label">Issued by</span>
                      <span className="cert-footer__value">Praisilia Anastasya</span>
                    </div>
                    <div className="cert-footer__item">
                      <span className="cert-footer__label">Issue Date</span>
                      <span className="cert-footer__value">{generated.date}</span>
                    </div>
                  </div>
                </div>

                <div className="cert-preview__actions">
                  <div className="cert-preview__btns">
                    <button id="cert-download-btn" className="btn btn-primary" onClick={handleDownload} disabled={downloading}>
                      <Download size={16} /> {downloading ? 'Generating\u2026' : 'Download PDF'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
