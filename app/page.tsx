"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    tag: "Fintech · Web App",
    name: "NOVA Pay",
    desc: "A cross-border payment dashboard for freelancers. Reduced transaction time by 60% with a streamlined multi-currency flow.",
    year: "2024",
  },
  {
    tag: "Healthcare · Mobile",
    name: "Pulsetrack",
    desc: "Remote patient monitoring app for post-surgery recovery. Serving 3,000+ patients across 12 hospitals in Southeast Asia.",
    year: "2024",
  },
  {
    tag: "SaaS · Design System",
    name: "Orbit DS",
    desc: "End-to-end design system for a B2B analytics platform — 80+ components, dark mode, accessibility-first from the ground up.",
    year: "2023",
  },
  {
    tag: "E-commerce · Branding",
    name: "Terroir",
    desc: "Brand identity & digital storefront for an artisanal wine importer. 2.4× conversion lift post-redesign.",
    year: "2023",
  },
];

// ─── Farmer Loader ────────────────────────────────────────────────────────────
function FarmerLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="farmer-loader">
      {/* farmer scene */}


      <div className="loader-bar">
        <div className="loader-fill" />
      </div>
      <p className="loader-text">Growing your portfolio…</p>

      <style>{`
        .farmer-loader {
          position: fixed; inset: 0; background: #0A0A0A; z-index: 9999;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 28px;
          animation: loaderExit 0.6s 2.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes loaderExit { to { transform: translateY(-100%); } }

        .scene { position: relative; width: 200px; height: 110px; }
        .ground {
          position: absolute; bottom: 0; left: 0; right: 0; height: 22px;
          background: #2D5016; border-radius: 4px 4px 0 0;
        }
        .seed {
          position: absolute; width: 8px; height: 8px; background: #8B6914;
          border-radius: 50%; bottom: 24px;
          animation: seedBounce 0.6s ease-in-out infinite alternate;
        }
        .seed:nth-child(2) { left: 16px; }
        .seed:nth-child(3) { left: 56px; }
        .seed:nth-child(4) { left: 96px; }
        .seed:nth-child(5) { left: 136px; }
        @keyframes seedBounce {
          0%   { transform: translateY(0) scale(1); background: #8B6914; }
          100% { transform: translateY(-18px) scale(0.7); background: #4CAF50; }
        }
        .sprout {
          position: absolute; bottom: 22px; width: 4px; background: #4CAF50;
          border-radius: 2px; transform-origin: bottom center;
          animation: sproutGrow 1.2s cubic-bezier(0.16,1,0.3,1) infinite;
        }
        .sprout:nth-child(6) { left: 18px; }
        .sprout:nth-child(7) { left: 58px; }
        .sprout:nth-child(8) { left: 98px; }
        @keyframes sproutGrow {
          0%,100% { height: 0; opacity: 0; }
          30%     { height: 24px; opacity: 1; }
          60%     { height: 32px; opacity: 1; }
          80%     { height: 28px; opacity: 0.6; }
        }
        .farmer { position: absolute; bottom: 18px; right: 8px; animation: farmerBob 0.45s ease-in-out infinite alternate; }
        .farmer-emoji { font-size: 40px; display: block; animation: farmerHoe 0.4s ease-in-out infinite alternate; }
        @keyframes farmerBob  { to { transform: translateY(-3px); } }
        @keyframes farmerHoe  { 0% { transform: rotate(-8deg); } 100% { transform: rotate(8deg); } }

        .loader-bar  { width: 200px; height: 2px; background: #222; border-radius: 2px; overflow: hidden; }
        .loader-fill { height: 100%; background: #FAFAF7; animation: loadFill 2.4s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes loadFill { 0% { width: 0%; } 100% { width: 100%; } }

        .loader-text {
          font-family: 'Syne', sans-serif; color: #FAFAF7; font-size: 12px;
          letter-spacing: 0.2em; text-transform: uppercase;
          animation: textPulse 1.8s ease-in-out infinite;
        }
        @keyframes textPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  tag, name, desc, year, delay,
}: { tag: string; name: string; desc: string; year: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* dark overlay */}
      <div className={`card-overlay ${hovered ? "card-overlay--in" : ""}`} />

      <div className="card-content">
        <span className={`card-tag ${hovered ? "card-tag--dark" : ""}`}>{tag}</span>
        <h2 className={`card-name ${hovered ? "card-name--dark" : ""}`}>{name}</h2>
        <p  className={`card-desc ${hovered ? "card-desc--dark" : ""}`}>{desc}</p>
        <p  className={`card-year ${hovered ? "card-year--dark" : ""}`}>{year}</p>
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
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [loaded]);

  const enlargeCursor = () => {
    const c = cursorRef.current;
    if (c) { c.style.width = "20px"; c.style.height = "20px"; c.style.background = "#1A56E8"; }
  };
  const resetCursor = () => {
    const c = cursorRef.current;
    if (c) { c.style.width = "8px"; c.style.height = "8px"; c.style.background = "#E8341A"; }
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
          color: rgba(255,255,255,0.05); letter-spacing: -0.03em;
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

        /* main fade-in after loader */
        .page-main {
          opacity: 0;
          animation: fadeIn 0.6s 2.85s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes fadeIn { to { opacity: 1; } }

        @media (max-width: 500px) {
          .footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* Loader */}
      <FarmerLoader onDone={() => setLoaded(true)} />

      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor-dot" />

      {/* Page */}
      <div className="page-main">
        {/* NAV */}
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
          <a className="nav-logo" onMouseEnter={enlargeCursor} onMouseLeave={resetCursor}>
            Shalini
          </a>
          <button
            className="nav-btn"
            onMouseEnter={enlargeCursor}
            onMouseLeave={resetCursor}
          >
            <span>Let&apos;s talk</span>
          </button>
        </nav>

        {/* HERO */}
        <section className="hero">
          <h1 className="hero-headline">
            <span className="word-reveal">
              <span className="word-in" style={{ animationDelay: "3.0s" }}>
                Aesthetic gets{" "}
              </span>
            </span>
            <span className="red-word">attention.</span>
            <br />
            <span className="word-reveal">
              <span className="word-in" style={{ animationDelay: "3.1s" }}>
                Function
              </span>
            </span>
            <br />
            <span className="word-reveal">
              <span className="word-in" style={{ animationDelay: "3.2s" }}>
                earns{" "}
              </span>
            </span>
            <span className="blue-word">trust.</span>
          </h1>

          {/* PROJECT CARDS */}
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.name}
                {...p}
                delay={3.3 + i * 0.1}
              />
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

        {/* FOOTER */}
        <footer className="footer">
          <span className="footer-copy">© 2024 Shalini</span>
          <div className="footer-links">
            {["Twitter", "Dribbble", "LinkedIn", "Resume"].map((l) => (
              <a
                key={l}
                className="footer-link"
                onMouseEnter={enlargeCursor}
                onMouseLeave={resetCursor}
              >
                {l}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}