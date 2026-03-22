"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "../../lib/projectData";
import { useParams } from "next/navigation";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find(p => p.slug === slug);

  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [project]);

  if (!project) {
    return (
      <div style={{ padding: "100px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1>404 - Project Not Found</h1>
        <Link href="/" style={{ color: "blue" }}>Go back home</Link>
      </div>
    );
  }

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
          transition: color 0.25s; text-decoration: none;
        }
        .nav-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #0A0A0A; transform: translateY(100%);
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-btn span { position: relative; z-index: 1; transition: color 0.25s; }
        .nav-btn:hover::before { transform: translateY(0); }
        .nav-btn:hover span { color: #FAFAF7; }

        /* header */
        .project-header {
          padding: clamp(36px,8vw,80px) clamp(20px,5vw,60px) clamp(20px,4vw,40px);
          display: flex; flex-direction: column; gap: 20px;
          animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) backwards;
        }
        .project-tag {
          font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
          background: #EAE8E0; padding: 6px 14px; border-radius: 100px;
          display: inline-block; width: max-content; font-weight: 600; color: #555;
        }
        .project-title {
          font-family: 'Syne', sans-serif; font-size: clamp(48px, 8vw, 88px);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
        }
        .project-meta {
          display: flex; gap: 40px; margin-top: 20px;
        }
        .meta-item { display: flex; flex-direction: column; gap: 4px; }
        .meta-label { font-size: 12px; color: #8A8A85; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;}
        .meta-val { font-size: 16px; font-weight: 500; }

        /* content */
        .project-content {
          padding: 0 clamp(20px,5vw,60px) clamp(40px,8vw,80px);
          display: flex; flex-direction: column; gap: 60px;
          max-width: 900px;
          animation: slideUp 0.8s 0.1s cubic-bezier(0.16,1,0.3,1) backwards;
        }

        .section-title {
          font-family: 'Syne', sans-serif; font-size: clamp(24px, 4vw, 36px);
          font-weight: 700; margin-bottom: 20px; letter-spacing: -0.02em;
        }
        .section-text {
          font-size: clamp(16px, 2vw, 20px); line-height: 1.6; color: #444;
        }
        
        .tech-tags {
          display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px;
        }
        .tech-tag {
          background: #0A0A0A; color: #FAFAF7; padding: 10px 20px;
          border-radius: 100px; font-size: 14px; font-weight: 500;
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* footer */
        .footer {
          padding: clamp(18px,4vw,30px) clamp(20px,5vw,60px);
          border-top: 1px solid rgba(0,0,0,0.08);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px;
          margin-top: 60px;
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
          .project-meta { flex-direction: column; gap: 20px; }
        }
      `}</style>

      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor-dot" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <Link href="/" className="nav-logo" onMouseEnter={enlargeCursor} onMouseLeave={resetCursor}>
          Shalini
        </Link>
        <Link
          href="/"
          className="nav-btn"
          onMouseEnter={enlargeCursor}
          onMouseLeave={resetCursor}
        >
          <span>Back to Home</span>
        </Link>
      </nav>

      {/* HEADER */}
      <header className="project-header">
        <span className="project-tag">{project.tag}</span>
        <h1 className="project-title">{project.name}</h1>
        <div className="project-meta">
          <div className="meta-item">
            <span className="meta-label">Year</span>
            <span className="meta-val">{project.year}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Role</span>
            <span className="meta-val">Creator</span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="project-content">
        <section>
          <h2 className="section-title">Overview</h2>
          <p className="section-text">{project.desc}</p>
        </section>

        <section>
          <h2 className="section-title">The Problem</h2>
          <p className="section-text">{project.problem}</p>
        </section>

        <section>
          <h2 className="section-title">The Solution</h2>
          <p className="section-text">{project.solution}</p>
        </section>

        <section>
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-tags">
            {project.techStack?.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </section>
      </main>

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
    </>
  );
}
