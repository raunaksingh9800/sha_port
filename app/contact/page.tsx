"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";

// ─── Meta Chip ────────────────────────────────────────────────────────────────
function MetaChip({ icon, text }: { icon: string; text: string }) {
  return (
    <>
      <div className="meta-chip">
        <span className="chip-icon">{icon}</span>
        <span className="chip-text">{text}</span>
      </div>
      <style>{`
        .meta-chip {
          display: flex; align-items: center; gap: 8px;
          background: rgba(0,0,0,0.05); border-radius: 100px;
          padding: 7px 14px;
        }
        .chip-icon { font-size: 14px; }
        .chip-text { font-size: 12px; font-weight: 500; color: #555; letter-spacing: 0.01em; }
      `}</style>
    </>
  );
}

// ─── Field Row ────────────────────────────────────────────────────────────────
function FieldRow({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="field-row">
      <div className="field-inner">
        <span className="field-label">{label}</span>
        <div className="field-control">{children}</div>
      </div>
      {error && <p className="field-error">{error}</p>}

      <style>{`
        .field-row { position: relative; }
        .field-inner {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          transition: border-bottom-color 0.2s;
        }
        .field-inner:focus-within { border-bottom-color: rgba(0,0,0,0.3); }
        .field-inner:focus-within .field-label { color: #0A0A0A; }
        .field-label {
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          font-weight: 600; color: #8A8A85;
          min-width: 88px; flex-shrink: 0; padding-top: 10px;
          transition: color 0.2s;
        }
        .field-control { flex: 1; }
        .field-error {
          font-size: 12px; color: #E8341A; font-weight: 500;
          padding: 5px 0 0 104px; letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Contact() {
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const enlargeCursor = () => {
    const c = cursorRef.current;
    if (c) { c.style.width = "20px"; c.style.height = "20px"; c.style.background = "#1A56E8"; }
  };
  const resetCursor = () => {
    const c = cursorRef.current;
    if (c) { c.style.width = "8px"; c.style.height = "8px"; c.style.background = "#E8341A"; }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", phone: "" };
    if (!formData.email) { newErrors.email = "Email is required."; valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = "Enter a valid email address."; valid = false; }
    if (!formData.phone) { newErrors.phone = "Phone number is required."; valid = false; }
    else if (!/^\+?[\d\s-]{10,15}$/.test(formData.phone)) { newErrors.phone = "Enter a valid 10–15 digit number."; valid = false; }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus("submitting");
      setTimeout(() => setStatus("success"), 1800);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #FAFAF7; color: #0A0A0A;
          font-family: 'DM Sans', sans-serif; overflow-x: hidden;
        }

        /* ── cursor ── */
        .cursor-dot {
          width: 8px; height: 8px; background: #E8341A; border-radius: 50%;
          position: fixed; pointer-events: none; z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s;
          mix-blend-mode: multiply;
        }
        @media (max-width: 768px) { .cursor-dot { display: none; } }

        /* ── nav ── */
        .nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: clamp(18px,4vw,30px) clamp(20px,5vw,60px);
          position: sticky; top: 0; background: #FAFAF7; z-index: 100;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s;
        }
        .nav--scrolled { border-bottom-color: rgba(0,0,0,0.08); }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-size: clamp(18px,3vw,22px); font-weight: 800;
          letter-spacing: -0.02em; cursor: pointer;
          position: relative; text-decoration: none; color: #0A0A0A;
        }
        .nav-logo::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px; background: #E8341A;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-logo:hover::after { width: 100%; }
        .nav-tag {
          font-size: 12px; font-weight: 500; color: #8A8A85;
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ── hero ── */
        .hero {
          padding: clamp(36px,8vw,80px) clamp(20px,5vw,60px) clamp(28px,5vw,48px);
        }
        .hero-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px,8vw,88px); font-weight: 800;
          line-height: 1.05; letter-spacing: -0.03em;
          margin-bottom: clamp(8px,2vw,16px);
          animation: wordSlide 0.8s 0.1s cubic-bezier(0.16,1,0.3,1) backwards;
        }
        @keyframes wordSlide {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .red-word {
          color: #E8341A; display: inline-block; position: relative; cursor: default;
        }
        .red-word::after {
          content: ''; position: absolute; bottom: 4px; left: 0;
          width: 100%; height: 4px; background: #E8341A;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .red-word:hover::after { transform: scaleX(1); }
        .blue-word {
          color: #1A56E8; display: inline-block; position: relative; cursor: default;
        }
        .blue-word::after {
          content: ''; position: absolute; bottom: 4px; left: 0;
          width: 100%; height: 4px; background: #1A56E8;
          transform: scaleX(0); transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .blue-word:hover::after { transform: scaleX(1); }

        /* ── section label ── */
        .section-label {
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #8A8A85; font-weight: 500; margin-bottom: 28px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after {
          content: ''; flex: 1; height: 1px; background: rgba(0,0,0,0.1);
        }

        /* ── contact section ── */
        .contact-section {
          padding: 0 clamp(20px,5vw,60px) clamp(48px,8vw,80px);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 760px) { .contact-grid { grid-template-columns: 1fr; } }

        /* ── card (matches profile-block) ── */
        .card-block {
          background: #F2F0EB; border-radius: 16px; padding: 28px 24px;
          position: relative; overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
          animation: cardSlide 0.7s cubic-bezier(0.16,1,0.3,1) backwards;
        }
        .card-block:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 52px rgba(0,0,0,0.09);
        }
        @keyframes cardSlide {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .card-block:nth-child(1) { animation-delay: 0.25s; }
        .card-block:nth-child(2) { animation-delay: 0.35s; }

        /* ── card header ── */
        .card-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 22px;
        }
        .card-eyebrow {
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          font-weight: 500; color: #8A8A85;
          display: flex; align-items: center; gap: 8px;
        }
        .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: #E8341A; display: inline-block; }
        .eyebrow-dot--blue { background: #1A56E8; }
        .card-bg-title {
          font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800;
          letter-spacing: -0.03em; color: #0A0A0A; opacity: 0.18;
        }

        /* ── form inputs ── */
        .form-input {
          width: 100%; background: transparent; border: none;
          padding: 8px 0; font-size: 16px; font-family: 'DM Sans', sans-serif;
          color: #0A0A0A; resize: none; line-height: 1.6;
        }
        .form-input:focus { outline: none; }
        .form-input::placeholder { color: rgba(0,0,0,0.22); }
        .form-input:disabled { opacity: 0.4; }

        /* ── submit btn (matches nav-btn) ── */
        .submit-btn {
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          border: 1.5px solid #0A0A0A; background: transparent;
          border-radius: 100px; padding: 12px 32px;
          cursor: pointer; position: relative; overflow: hidden; color: #0A0A0A;
          display: inline-flex; align-items: center; gap: 8px;
          font-weight: 500; margin-top: 24px;
        }
        .submit-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #0A0A0A; transform: translateY(100%);
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .submit-btn span { position: relative; z-index: 1; transition: color 0.25s; }
        .submit-btn .btn-spinner { position: relative; z-index: 1; }
        .submit-btn:hover:not(:disabled)::before { transform: translateY(0); }
        .submit-btn:hover:not(:disabled) span { color: #FAFAF7; }
        .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* spinner */
        .btn-spinner {
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid rgba(0,0,0,0.2); border-top-color: #0A0A0A;
          animation: spin 0.75s linear infinite; flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── info card rows ── */
        .info-chips {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 24px;
        }
        .avail-row {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .avail-row:last-child { border-bottom: none; padding-bottom: 0; }
        .avail-row:first-of-type { padding-top: 0; }
        .avail-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
          animation: dotPulse 1.8s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.5); opacity: 0.5; }
        }
        .avail-label { font-size: 13px; font-weight: 500; color: #0A0A0A; flex: 1; }
        .avail-value { font-size: 12px; color: #8A8A85; }

        /* ── banner ── */
        .contact-banner {
          height: clamp(120px,18vw,200px);
          background: #0A0A0A; border-radius: 20px;
          position: relative; overflow: hidden; cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          grid-column: 1 / -1;
          animation: cardSlide 0.7s 0.45s cubic-bezier(0.16,1,0.3,1) backwards;
        }
        .contact-banner:hover { transform: scale(0.99); }
        .banner-marquee {
          position: absolute; top: 50%; transform: translateY(-50%);
          white-space: nowrap;
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px,7vw,80px); font-weight: 800;
          color: rgba(255,255,255,0.15); letter-spacing: -0.03em;
          animation: marquee 12s linear infinite;
        }
        @keyframes marquee {
          0%   { transform: translateY(-50%) translateX(0); }
          100% { transform: translateY(-50%) translateX(-50%); }
        }
        .banner-cta {
          position: absolute; bottom: 20px; left: 28px;
          font-family: 'Syne', sans-serif;
          font-size: clamp(12px,2vw,16px); color: rgba(255,255,255,0.4);
          font-weight: 600; letter-spacing: -0.01em;
          transition: color 0.3s;
        }
        .contact-banner:hover .banner-cta { color: rgba(255,255,255,0.85); }
        .banner-dot {
          position: absolute; top: 20px; right: 20px;
          width: 10px; height: 10px; background: #E8341A; border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        /* ── success card ── */
        .success-card {
          background: #F2F0EB; border-radius: 16px; padding: 56px 36px;
          text-align: center; grid-column: 1 / -1;
          animation: cardSlide 0.7s cubic-bezier(0.16,1,0.3,1) backwards;
        }
        .success-icon-wrap {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(46,160,67,0.12);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          animation: popIn 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) backwards;
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .success-eyebrow {
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          font-weight: 500; color: #8A8A85; margin-bottom: 12px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .success-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px,5vw,44px); font-weight: 800;
          letter-spacing: -0.03em; margin-bottom: 14px;
        }
        .success-body {
          font-size: 15px; color: #555; line-height: 1.6;
          max-width: 380px; margin: 0 auto 32px;
        }
        .success-chips {
          display: flex; justify-content: center; gap: 10px;
          flex-wrap: wrap; margin-bottom: 36px;
        }
        .s-chip {
          background: rgba(0,0,0,0.06); border-radius: 100px;
          padding: 7px 16px; font-size: 13px; color: #555;
          display: flex; align-items: center; gap: 8px;
        }
        .s-chip-label {
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #8A8A85; font-weight: 600;
        }
        .btn-reset {
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          border: 1.5px solid #0A0A0A; background: transparent;
          border-radius: 100px; padding: 11px 30px;
          cursor: pointer; position: relative; overflow: hidden; color: #0A0A0A;
          font-weight: 500;
        }
        .btn-reset::before {
          content: ''; position: absolute; inset: 0;
          background: #0A0A0A; transform: translateY(100%);
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-reset span { position: relative; z-index: 1; transition: color 0.25s; }
        .btn-reset:hover::before { transform: translateY(0); }
        .btn-reset:hover span { color: #FAFAF7; }

        /* ── footer ── */
        .footer {
          padding: clamp(18px,4vw,30px) clamp(20px,5vw,60px);
          border-top: 1px solid rgba(0,0,0,0.08);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-copy { font-size: 13px; color: #8A8A85; }
        .footer-links { display: flex; gap: 18px; }
        .footer-link {
          font-size: 13px; color: #8A8A85; cursor: pointer;
          position: relative; text-decoration: none; transition: color 0.2s;
        }
        .footer-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 0; height: 1px; background: #0A0A0A; transition: width 0.2s;
        }
        .footer-link:hover { color: #0A0A0A; }
        .footer-link:hover::after { width: 100%; }
        @media (max-width: 500px) {
          .footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="cursor-dot" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <Link href="/" className="nav-logo" onMouseEnter={enlargeCursor} onMouseLeave={resetCursor}>
          Shalini
        </Link>
        <span className="nav-tag">Contact</span>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-headline">
          Say <span className="red-word">hello.</span>
          <br />
          Let&apos;s make <span className="blue-word">something.</span>
        </h1>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <p className="section-label">Get in touch</p>

        <div className="contact-grid">

          {status === "success" ? (
            /* ── SUCCESS ── */
            <div className="success-card">
              <div className="success-icon-wrap">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="success-eyebrow">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2D6A4F", display: "inline-block" }} />
                Message received
              </div>
              <h2 className="success-title">You&apos;re all set!</h2>
              <p className="success-body">
                Thanks for reaching out. I review every message personally and will get back to you within 24 hours.
              </p>
              <div className="success-chips">
                <div className="s-chip">
                  <span className="s-chip-label">Email</span>
                  {formData.email}
                </div>
                <div className="s-chip">
                  <span className="s-chip-label">Phone</span>
                  {formData.phone}
                </div>
              </div>
              <button
                className="btn-reset"
                onClick={() => { setStatus("idle"); setFormData({ email: "", phone: "", message: "" }); }}
                onMouseEnter={enlargeCursor}
                onMouseLeave={resetCursor}
              >
                <span>← Send another</span>
              </button>
            </div>
          ) : (
            <>
              {/* ── FORM CARD ── */}
              <div className="card-block">
                <div className="card-header">
                  <span className="card-eyebrow">
                    <span className="eyebrow-dot" />
                    Message
                  </span>
                  <span className="card-bg-title">Write</span>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <FieldRow label="Email" error={errors.email}>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="hello@example.com"
                      value={formData.email}
                      disabled={status === "submitting"}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    />
                  </FieldRow>

                  <FieldRow label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      disabled={status === "submitting"}
                      onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
                    />
                  </FieldRow>

                  <FieldRow label="Message">
                    <textarea
                      className="form-input"
                      placeholder="What's on your mind?"
                      rows={4}
                      value={formData.message}
                      disabled={status === "submitting"}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </FieldRow>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={status === "submitting"}
                    onMouseEnter={enlargeCursor}
                    onMouseLeave={resetCursor}
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="btn-spinner" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <span>Send message ↗</span>
                    )}
                  </button>
                </form>
              </div>

              {/* ── INFO CARD ── */}
              <div className="card-block">
                <div className="card-header">
                  <span className="card-eyebrow">
                    <span className="eyebrow-dot eyebrow-dot--blue" />
                    Details
                  </span>
                  <span className="card-bg-title">Info</span>
                </div>

                <div className="info-chips">
                  <MetaChip icon="📍" text="India · Remote worldwide" />
                  <MetaChip icon="🕐" text="IST (UTC+5:30)" />
                  <MetaChip icon="💬" text="Replies within 24 hrs" />
                </div>

                <div>
                  <div className="avail-row">
                    <span className="avail-dot" style={{ background: "#2D6A4F" }} />
                    <span className="avail-label">Open to freelance</span>
                    <span className="avail-value">● Active</span>
                  </div>
                  <div className="avail-row">
                    <span className="avail-dot" style={{ background: "#1A56E8", animationDelay: "0.3s" }} />
                    <span className="avail-label">UI/UX Design</span>
                    <span className="avail-value">Product</span>
                  </div>
                  <div className="avail-row">
                    <span className="avail-dot" style={{ background: "#E8341A", animationDelay: "0.6s" }} />
                    <span className="avail-label">Branding & Systems</span>
                    <span className="avail-value">Identity</span>
                  </div>
                  <div className="avail-row">
                    <span className="avail-dot" style={{ background: "#8A8A85", animationDelay: "0.9s" }} />
                    <span className="avail-label">Cybersecurity Content</span>
                    <span className="avail-value">Writing</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── BANNER ── */}
          {status !== "success" && (
            <div className="contact-banner">
              <div className="banner-marquee">
                LET&apos;S TALK · BUILD TOGETHER · LET&apos;S TALK · BUILD TOGETHER · LET&apos;S TALK · BUILD TOGETHER ·&nbsp;
              </div>
              <div className="banner-dot" />
              <div className="banner-cta">Drop a line — I don&apos;t bite.</div>
            </div>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-copy">© 2024 Shalini</span>
        <div className="footer-links">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/shalini-gowda-a46863332/" },
            { label: "Resume", href: "/resume.pdf" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer-link"
              onMouseEnter={enlargeCursor}
              onMouseLeave={resetCursor}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}