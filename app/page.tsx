"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "./lib/projectData";

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  tag,
  name,
  desc,
  year,
  delay,
  slug,
}: {
  tag: string;
  name: string;
  desc: string;
  year: string;
  delay: number;
  slug: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/projects/${slug}`}
      className="project-card"
      style={{
        animationDelay: `${delay}s`,
        textDecoration: "none",
        display: "block",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`card-overlay ${hovered ? "card-overlay--in" : ""}`} />
      <div className="card-content">
        <span className={`card-tag ${hovered ? "card-tag--dark" : ""}`}>
          {tag}
        </span>
        <h2 className={`card-name ${hovered ? "card-name--dark" : ""}`}>
          {name}
        </h2>
        <p className={`card-desc ${hovered ? "card-desc--dark" : ""}`}>
          {desc}
        </p>
        <p className={`card-year ${hovered ? "card-year--dark" : ""}`}>
          {year}
        </p>
      </div>
      <span className={`card-arrow ${hovered ? "card-arrow--in" : ""}`}>↗</span>

      <style>{`
        .project-card {
          background: #F2F0EB; border-radius: 16px; padding: 28px 24px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
          animation: cardSlide 0.7s cubic-bezier(0.16,1,0.3,1) backwards;
        }
        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        @keyframes cardSlide {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .card-overlay {
          position: absolute; inset: 0; background: #0A0A0A;
          border-radius: 16px; z-index: 0;
          transform: translateY(101%);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .card-overlay--in { transform: translateY(0); }
        .card-content { position: relative; z-index: 1; }
        .card-tag {
          display: inline-block; font-size: 11px; letter-spacing: 0.1em;
          text-transform: uppercase; background: rgba(0,0,0,0.08);
          padding: 4px 10px; border-radius: 100px; margin-bottom: 14px;
          font-weight: 500; color: #8A8A85;
          transition: background 0.3s, color 0.3s;
        }
        .card-tag--dark { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.6); }
        .card-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 2.5vw, 26px); font-weight: 700;
          opacity: 0.28; margin-bottom: 10px; letter-spacing: -0.02em;
          transition: color 0.3s, opacity 0.3s; color: #0A0A0A;
        }
        .card-name--dark { color: #FAFAF7; opacity: 1; }
        .card-desc {
          font-size: 14px; line-height: 1.6; color: #555;
          margin-bottom: 18px; transition: color 0.3s;
        }
        .card-desc--dark { color: rgba(255,255,255,0.75); }
        .card-year { font-size: 13px; color: #8A8A85; font-weight: 500; transition: color 0.3s; }
        .card-year--dark { color: rgba(255,255,255,0.45); }
        .card-arrow {
          position: absolute; top: 22px; right: 22px; font-size: 18px;
          color: #FAFAF7; z-index: 1; opacity: 0;
          transform: translate(-5px, 5px);
          transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1),
                      transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .card-arrow--in { opacity: 1; transform: translate(0, 0); }
      `}</style>
    </Link>
  );
}

// ─── Logo Box ─────────────────────────────────────────────────────────────────
function LogoBox({ initials, cls }: { initials: string; cls: string }) {
  return (
    <>
      <div className={`logo-box ${cls} rounded-full`}>
        <img className=" rounded-full" src={initials} alt="logo" />
      </div>
      <style>{`
        .logo-box {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 14px; font-weight: 700;
          font-family: 'Syne', sans-serif; letter-spacing: -0.02em;
        }
      `}</style>
    </>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ label, type }: { label: string; type: "active" | "neutral" }) {
  return (
    <>
      <span className={`badge badge--${type} `}>{label}</span>
      <style>{`
        .badge {
          display: inline-block; font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 2px 8px;
          border-radius: 100px; font-weight: 500;
        }
        .badge--neutral { background: rgba(0,0,0,0.07); color: #555; }
        .badge--active  { background: rgba(46,160,67,0.12); color: #2D6A4F; }
      `}</style>
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const experience = [
  {
    initials:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT87kxdxVHFRY8OcBDBx6GCcojnN57PwWUkg&s",
    logoClass: "oscode",
    role: "Content Creation Lead",
    org: "OSCode",
    period: "Sep 2025 – Present · 7 mos",
    tags: [{ label: "● Active", type: "active" as const }],
  },
  {
    initials:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvjA8CJRiRp1tjDTVKNi9Q6YvYnT8rbP2LBA&s",
    logoClass: "gdg",
    role: "Cybersecurity Lead",
    org: "Google Developers Group",
    period: "Sep 2025 – Present · 7 mos",
    tags: [{ label: "● Active", type: "active" as const }],
  },
  {
    initials:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2UcHQntpZXQk5AlAs43-Jc3OUB1f_yiVhQ&s",
    logoClass: "acc",
    role: "Documentation Team Member",
    org: "Atria Code Committee",
    period: "Jun 2025 – Present · 10 mos",
    tags: [
      { label: "Part-time", type: "neutral" as const },
      { label: "● Active", type: "active" as const },
    ],
  },
];

const education = [
  {
    initials:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMU4Wv9Lk7D_vz-Km3FFcEkP_-K4btlJMhYg&s",
    logoClass: "ait",
    degree: "B.E. Computer Science & Engineering",
    institution: "Atria Institute of Technology",
    period: "2024 – 2028",
    tags: [{ label: "● Ongoing", type: "active" as const }],
  },
  {
    initials: "https://apsbangalore.edu.in/resources/assets/images/logo.png",
    logoClass: "aps",
    degree: "I–XII (CBSE), Science — PCMC",
    institution: "Army Public School Bangalore",
    period: "Aug 2012 – May 2024",
    tags: [{ label: "Completed", type: "neutral" as const }],
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

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
    if (c) {
      c.style.width = "20px";
      c.style.height = "20px";
      c.style.background = "#1A56E8";
    }
  };
  const resetCursor = () => {
    const c = cursorRef.current;
    if (c) {
      c.style.width = "8px";
      c.style.height = "8px";
      c.style.background = "#E8341A";
    }
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #FAFAF7; color: #0A0A0A;
          font-family: 'DM Sans', sans-serif; overflow-x: hidden;
        }

        /* cursor */
        .cursor-dot {
          width: 8px; height: 8px; background: #E8341A; border-radius: 50%;
          position: fixed; pointer-events: none; z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s;
          mix-blend-mode: multiply;
        }
        @media (max-width: 768px) { .cursor-dot { display: none; } }

        /* nav */
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

        .nav-btn {
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          border: 1.5px solid #0A0A0A; background: transparent;
          border-radius: 100px; padding: 8px 24px;
          cursor: pointer; position: relative; overflow: hidden; color: #0A0A0A;
          transition: color 0.25s;
        }
        .nav-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #0A0A0A; transform: translateY(100%);
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-btn span { position: relative; z-index: 1; transition: color 0.25s; }
        .nav-btn:hover::before { transform: translateY(0); }
        .nav-btn:hover span { color: #FAFAF7; }

        /* hero */
        .hero { padding: clamp(36px,8vw,80px) clamp(20px,5vw,60px) clamp(36px,6vw,60px); }
        .hero-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px,8vw,88px); font-weight: 800;
          line-height: 1.05; letter-spacing: -0.03em;
          margin-bottom: clamp(28px,6vw,60px);
        }
        .word-reveal { overflow: hidden; display: inline-block; }
        .word-in {
          display: inline-block;
          animation: wordSlide 0.8s cubic-bezier(0.16,1,0.3,1) backwards;
        }
        @keyframes wordSlide {
          from { transform: translateY(100%); opacity: 0; }
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

        /* projects grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px; margin-bottom: clamp(36px,8vw,80px);
        }

        /* banner */
        .feature-banner {
          height: clamp(180px,30vw,320px);
          background: #0A0A0A; border-radius: 20px;
          position: relative; overflow: hidden; cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          margin-bottom: clamp(32px,6vw,60px);
        }
        .feature-banner:hover { transform: scale(0.99); }
        .banner-marquee {
          position: absolute; top: 50%; transform: translateY(-50%);
          white-space: nowrap;
          font-family: 'Syne', sans-serif;
          font-size: clamp(44px,10vw,120px); font-weight: 800;
          color: rgba(255,255,255,0.2); letter-spacing: -0.03em;
          animation: marquee 14s linear infinite;
        }
        @keyframes marquee {
          0%   { transform: translateY(-50%) translateX(0); }
          100% { transform: translateY(-50%) translateX(-50%); }
        }
        .banner-label {
          position: absolute; bottom: 28px; left: 36px;
          font-family: 'Syne', sans-serif;
          font-size: clamp(14px,2.5vw,22px); color: rgba(255,255,255,0.45);
          font-weight: 600; letter-spacing: -0.02em;
          transition: color 0.3s;
        }
        .feature-banner:hover .banner-label { color: rgba(255,255,255,0.88); }
        .banner-dot {
          position: absolute; top: 28px; right: 28px;
          width: 12px; height: 12px; background: #E8341A; border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100% { transform: scale(1);   opacity: 1;   }
          50%     { transform: scale(1.5); opacity: 0.6; }
        }

        /* ── Profile section ── */
        .profile-section {
          padding: 0 clamp(20px,5vw,60px) clamp(48px,8vw,80px);
        }
        .section-label {
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #8A8A85; font-weight: 500; margin-bottom: 36px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after {
          content: ''; flex: 1; height: 1px; background: rgba(0,0,0,0.1);
        }
        .profile-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }
        @media (max-width: 650px) { .profile-grid { grid-template-columns: 1fr; } }

        .profile-block {
          background: #F2F0EB; border-radius: 16px; padding: 28px 24px;
          position: relative; overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
          animation: cardSlide 0.7s cubic-bezier(0.16,1,0.3,1) backwards;
        }
        .profile-block:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 52px rgba(0,0,0,0.09);
        }
        .profile-block:nth-child(1) { animation-delay: 0.1s; }
        .profile-block:nth-child(2) { animation-delay: 0.2s; }

        .block-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 20px;
        }
        .block-eyebrow {
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          font-weight: 500; color: #8A8A85;
          display: flex; align-items: center; gap: 8px;
        }
        .eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #E8341A; display: inline-block;
        }
        .eyebrow-dot--blue { background: #1A56E8; }
        .block-bg-title {
          font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800;
          letter-spacing: -0.03em; color: #0A0A0A; opacity: 0.18;
        }

        .profile-entry {
          display: flex; gap: 16px; padding: 18px 0;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .profile-entry:last-child { border-bottom: none; padding-bottom: 0; }
        .profile-entry:first-of-type { padding-top: 0; }
        .entry-body { flex: 1; min-width: 0; }
        .entry-role {
          font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
          letter-spacing: -0.01em; color: #0A0A0A; margin-bottom: 2px;
        }
        .entry-org { font-size: 13px; color: #555; font-weight: 500; margin-bottom: 6px; }
        .entry-meta {
          font-size: 12px; color: #8A8A85;
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
        }
        .edu-divider { width: 100%; height: 1px; background: rgba(0,0,0,0.08); margin: 18px 0; }

        /* footer */
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
          position: relative; text-decoration: none;
          transition: color 0.2s;
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

      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor-dot" />

      {/* Page */}
      <div className="page-main">
        {/* NAV */}
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
          <a
            className="nav-logo"
            onMouseEnter={enlargeCursor}
            onMouseLeave={resetCursor}
          >
            Shalini
          </a>
          <Link
            href="/contact"
            className="nav-btn"
            onMouseEnter={enlargeCursor}
            onMouseLeave={resetCursor}
          >
            <span>Let&apos;s talk</span>
          </Link>
        </nav>

        {/* HERO */}
        <section className="hero">
          <h1 className="hero-headline">
            <span className="word-reveal">
              <span className="word-in" style={{ animationDelay: "0s" }}>
                Aesthetic gets{" "}
              </span>
            </span>
            <span className="red-word">attention.</span>
            <br />
            <span className="word-reveal">
              <span className="word-in" style={{ animationDelay: "0.1s" }}>
                Function
              </span>
            </span>
            <br />
            <span className="word-reveal">
              <span className="word-in" style={{ animationDelay: "0.2s" }}>
                earns{" "}
              </span>
            </span>
            <span className="blue-word">trust.</span>
          </h1>

          {/* PROJECT CARDS */}
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} {...p} delay={0.3 + i * 0.1} />
            ))}
          </div>

          {/* BANNER */}
          <div className="feature-banner">
            <div className="banner-marquee">
              PRODUCT DESIGN · UI/UX · BRANDING · MOTION · SYSTEMS · PRODUCT
              DESIGN · UI/UX · BRANDING · MOTION · SYSTEMS ·&nbsp;
            </div>
            <div className="banner-dot" />
            <div className="banner-label">
              Currently available for freelance — let&apos;s build something.
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE & EDUCATION ── */}
        <section className="profile-section">
          <p className="section-label">Profile</p>

          <div className="profile-grid">
            {/* EXPERIENCE */}
            <div className="profile-block">
              <div className="block-header">
                <span className="block-eyebrow">
                  <span className="eyebrow-dot" />
                  Experience
                </span>
                <span className="block-bg-title">Work</span>
              </div>

              {experience.map((e, i) => (
                <div className="profile-entry" key={i}>
                  <LogoBox initials={e.initials} cls={e.logoClass} />
                  <div className="entry-body">
                    <p className="entry-role">{e.role}</p>
                    <p className="entry-org">{e.org}</p>
                    <div className="entry-meta">
                      <span>{e.period}</span>
                      {e.tags.map((t, j) => (
                        <Badge key={j} label={t.label} type={t.type} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* EDUCATION */}
            <div className="profile-block">
              <div className="block-header">
                <span className="block-eyebrow">
                  <span className="eyebrow-dot eyebrow-dot--blue" />
                  Education
                </span>
                <span className="block-bg-title">Study</span>
              </div>

              {education.map((e, i) => (
                <div key={i}>
                  {i > 0 && <div className="edu-divider" />}
                  <div
                    className="profile-entry"
                    style={{ paddingTop: i === 0 ? 0 : 18, border: "none" }}
                  >
                    <LogoBox initials={e.initials} cls={e.logoClass} />
                    <div className="entry-body">
                      <p className="entry-role">{e.degree}</p>
                      <p className="entry-org">{e.institution}</p>
                      <div className="entry-meta">
                        <span>{e.period}</span>
                        {e.tags.map((t, j) => (
                          <Badge key={j} label={t.label} type={t.type} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <span className="footer-copy">© 2024 Shalini</span>
          <div className="footer-links">
            {[
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/shalini-gowda-a46863332/",
              },
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
      </div>
    </>
  );
}