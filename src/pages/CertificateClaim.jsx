import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useCTF } from '../context/CTFContext';
import { Trophy, Download, Shield } from 'lucide-react';
import { jsPDF } from 'jspdf';
import './CertificateClaim.css';

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function CertificateClaim() {
  const { isComplete } = useCTF();
  const [name, setName] = useState('');
  const [generated, setGenerated] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef(null);

  if (!isComplete) return <Navigate to="/hack" replace />;

  const handleGenerate = () => {
    if (!name.trim()) return;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    setGenerated({ name: name.trim(), date });
  };

  const handleDownload = () => {
    if (!generated) return;
    setDownloading(true);
    try {

      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      
      // 1. Background (Light Slate/Neutral)
      pdf.setFillColor('#f8fafc');
      pdf.rect(0, 0, 297, 210, 'F');
      
      // 2. Outer Border (Dark Slate)
      pdf.setDrawColor('#1e293b');
      pdf.setLineWidth(1.2);
      pdf.rect(12, 12, 273, 186, 'S');
      
      // 3. Inner Border (Blue Accent)
      pdf.setDrawColor('#93c5fd');
      pdf.setLineWidth(0.8);
      pdf.rect(15, 15, 267, 180, 'S');
      
      // 4. Top Accent Bar (Solid Blue)
      pdf.setFillColor('#3b82f6');
      pdf.rect(15, 15, 267, 4, 'F');
      
      // 5. Shield Badge (Circular vector shield matching Lucide Shield)
      pdf.setFillColor('#eff6ff');
      pdf.setDrawColor('#3b82f6');
      pdf.setLineWidth(1.5);
      pdf.circle(148.5, 42, 10, 'FD');
      
      // Draw shield outline matching Lucide Shield path
      pdf.setDrawColor('#3b82f6');
      pdf.setLineWidth(1.1);
      pdf.line(148.5, 36.8, 144.5, 38.3);
      pdf.line(148.5, 36.8, 152.5, 38.3);
      pdf.line(144.5, 38.3, 144.5, 43.0);
      pdf.line(152.5, 38.3, 152.5, 43.0);
      pdf.line(144.5, 43.0, 145.8, 45.4);
      pdf.line(145.8, 45.4, 148.5, 47.3);
      pdf.line(152.5, 43.0, 151.2, 45.4);
      pdf.line(151.2, 45.4, 148.5, 47.3);
      // Vertical seam for professional touch
      pdf.setDrawColor('#bfdbfe');
      pdf.setLineWidth(0.6);
      pdf.line(148.5, 37.3, 148.5, 46.8);
      
      // 6. Certificate Title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.setTextColor('#3b82f6');
      pdf.text('CERTIFICATE OF COMPLETION', 148.5, 66, { align: 'center' });
      
      // Flanking horizontal ornament lines
      pdf.setDrawColor('#93c5fd');
      pdf.setLineWidth(0.5);
      pdf.line(40, 64, 85, 64);
      pdf.line(212, 64, 257, 64);
      
      // 7. Presentation Subtitle
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor('#64748b');
      pdf.text('This certifies that', 148.5, 78, { align: 'center' });
      
      // 8. Recipient Name
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(28);
      pdf.setTextColor('#0f172a');
      pdf.text(generated.name, 148.5, 94, { align: 'center' });
      
      // Underline divider
      pdf.setDrawColor('#3b82f6');
      pdf.setLineWidth(0.75);
      pdf.line(100, 100, 197, 100);
      
      // 9. Completion Details
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor('#64748b');
      pdf.text('has successfully completed the', 148.5, 108, { align: 'center' });
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor('#1d4ed8');
      pdf.text('Hack The Portfolio — Security Challenge', 148.5, 118, { align: 'center' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor('#475569');
      const descText = 'by discovering all three hidden flags through web security analysis, OSINT investigation, and a multi-phase security consultant simulation.';
      const splitDesc = pdf.splitTextToSize(descText, 180);
      pdf.text(splitDesc, 148.5, 128, { align: 'center' });
      
      // 10. Footer Info Strip (Vector Box)
      pdf.setFillColor('#eff6ff');
      pdf.setDrawColor('#bfdbfe');
      pdf.setLineWidth(0.5);
      pdf.rect(30, 145, 237, 24, 'FD');
      
      // Left side: Issued by
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor('#3b82f6');
      pdf.text('ISSUED BY', 75, 153, { align: 'center' });
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor('#0f172a');
      pdf.text('Praisilia Anastasya', 75, 161, { align: 'center' });
      
      // Center separator
      pdf.setDrawColor('#bfdbfe');
      pdf.setLineWidth(0.5);
      pdf.line(148.5, 148, 148.5, 166);
      
      // Right side: Issue date
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor('#3b82f6');
      pdf.text('ISSUE DATE', 222, 153, { align: 'center' });
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor('#0f172a');
      pdf.text(generated.date, 222, 161, { align: 'center' });
      
      // 11. Website tagline
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor('#94a3b8');
      pdf.text('Portfolio Security Challenge — praisilia.dev', 148.5, 182, { align: 'center' });
      
      // 12. Save PDF directly
      pdf.save(`CTF-Certificate-${generated.name.replace(/\s+/g, '-')}.pdf`);
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
                    className="input"
                    placeholder="Enter your name..."
                    autoComplete="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                  />
                </div>
                <button
                  id="cert-generate-btn"
                  className="btn btn-primary btn-lg"
                  onClick={handleGenerate}
                  disabled={!name.trim()}
                >
                  <Trophy size={18} /> Generate Certificate
                </button>
              </div>
            ) : (
              <motion.div className="cert-preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="cert-preview__card" ref={certRef}>
                  {/* Blue top bar */}
                  <div className="cert-preview__top-bar" />

                  <div className="cert-preview__border-outer">
                    <div className="cert-preview__border-inner">
                      {/* Shield badge */}
                      <div className="cert-preview__badge">
                        <Shield size={26} />
                      </div>

                      {/* Ornament flanking lines */}
                      <div className="cert-preview__ornament-row">
                        <div className="cert-preview__ornament-line" />
                        <p className="cert-preview__certified-text">CERTIFICATE OF COMPLETION</p>
                        <div className="cert-preview__ornament-line" />
                      </div>

                      <p className="cert-preview__presented-to">This certifies that</p>
                      <h2 className="cert-preview__name">{generated.name}</h2>
                      <div className="cert-preview__divider" />
                      <p className="cert-preview__challenge">has successfully completed the</p>
                      <h3 className="cert-preview__challenge-title">Hack The Portfolio — Security Challenge</h3>
                      <p className="cert-preview__desc">
                        by discovering all three hidden flags through web security analysis, OSINT investigation,
                        and a multi-phase security consultant simulation.
                      </p>
                    </div>
                  </div>

                  {/* Blue footer strip */}
                  <div className="cert-preview__footer-strip">
                    <div className="cert-preview__footer-item">
                      <span className="cert-preview__footer-label">Issued by</span>
                      <span className="cert-preview__footer-value">Praisilia Anastasya</span>
                    </div>
                    <div className="cert-preview__footer-sep" />
                    <div className="cert-preview__footer-item">
                      <span className="cert-preview__footer-label">Issue Date</span>
                      <span className="cert-preview__footer-value">{generated.date}</span>
                    </div>
                  </div>

                  <p className="cert-preview__tagline">Portfolio Security Challenge — praisilia.dev</p>
                </div>

                <div className="cert-preview__actions">
                  <div className="cert-preview__btns">
                    <button id="cert-download-btn" className="btn btn-primary" onClick={handleDownload} disabled={downloading}>
                      <Download size={16} /> {downloading ? 'Generating…' : 'Download PDF'}
                    </button>
                    <button className="btn btn-secondary" onClick={() => setGenerated(null)}>
                      Generate New
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
