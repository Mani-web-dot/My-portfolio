import { useState, useEffect, useRef } from "react";

const resumeData = {
  name: "Puppala Mani Charan",
  title: "Python Web Developer",
  taglines: ["Building Digital Worlds", "Crafting Code Solutions", "Engineering the Future", "Python Developer"],
  contact: {
    phone: "+919959685743",
    email: "manicharanpuppala@gmail.com",
    github: "https://github.com/Saivarshith08",
    linkedin: "https://www.linkedin.com/in/sai-varshith-undefined-7aa57429a/",
  },
  summary:
    "A passionate technology enthusiast with working knowledge of Python and web development, focused on building user-friendly digital solutions. Gained hands-on exposure through academic projects, internships, technical workshops, and simulation tools.",
  skills: [
    { name: "Python", level: 80, color: "#00ff9f" },
    { name: "SQL", level: 70, color: "#00cfff" },
    { name: "C", level: 65, color: "#bf00ff" },
    { name: "Docker", level: 60, color: "#00ff9f" },
    { name: "GIT", level: 75, color: "#00cfff" },
    { name: "Web Development", level: 72, color: "#bf00ff" },
    { name: "Team Coordination", level: 85, color: "#00ff9f" },
    { name: "Technical Communication", level: 80, color: "#00cfff" },
  ],
  projects: [
    {
      title: "Collaborative Whiteboard",
      description:
        "A real-time collaborative whiteboard web application enabling multiple users to draw, annotate, and share ideas simultaneously in a browser-based canvas.",
      tech: ["Python", "WebSocket", "HTML5 Canvas", "JavaScript"],
      icon: "🖥️",
      color: "#00ff9f",
    },
    {
      title: "Steganography Tool",
      description:
        "A digital steganography application that hides secret messages within image files using LSB encoding techniques, ensuring data privacy and covert communication.",
      tech: ["Python", "PIL", "Cryptography", "NumPy"],
      icon: "🔐",
      color: "#00cfff",
    },
  ],
  experience: [
    {
      company: "GWING Software Technologies Pvt. Ltd",
      role: "Python Web Developer Intern",
      period: "2025",
      description:
        "Gaining hands-on experience as a Python Web Developer Intern, building a collaborative whiteboard web application and working with real-world development tools and workflows.",
      color: "#00ff9f",
    },
  ],
  education: [
    {
      institution: "Gurunanak Institution of Technology",
      degree: "B.Tech, Computer Science Engineering",
      period: "Jul 2024 – May 2027",
      cgpa: "7.5",
      color: "#00ff9f",
    },
    {
      institution: "Sanjay Gandhi Government Polytechnic, Adilabad",
      degree: "Diploma – Computer Science Engineering",
      period: "2021–2024",
      cgpa: "8.2",
      color: "#00cfff",
    },
    {
      institution: "Krishnaveni E/M High School, Manthani",
      degree: "SSC",
      period: "2020–2021",
      cgpa: "10/10",
      color: "#bf00ff",
    },
  ],
  certifications: [
    {
      title: "Database Engineer Intern Certificate",
      issuer: "GWING Software Technologies Pvt. Ltd",
      year: "2025",
      color: "#00ff9f",
    },
  ],
};

function GlitchText({ text }) {
  return (
    <span className="glitch-wrapper">
      <span className="glitch" data-text={text}>
        {text}
      </span>
    </span>
  );
}

function TypewriterText({ texts }) {
  const [display, setDisplay] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setTextIdx((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts]);

  return (
    <span>
      {display}
      <span className="cursor">|</span>
    </span>
  );
}

function SkillBar({ skill, animate }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct" style={{ color: skill.color }}>{skill.level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: animate ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            boxShadow: animate ? `0 0 10px ${skill.color}` : "none",
          }}
        />
      </div>
    </div>
  );
}

function SectionTitle({ children, subtitle }) {
  return (
    <div className="section-title-wrap">
      <div className="section-title-inner">
        <span className="section-bracket">[</span>
        <h2 className="section-title">{children}</h2>
        <span className="section-bracket">]</span>
      </div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-line" />
    </div>
  );
}

function NavDot({ label, active, onClick }) {
  return (
    <button className={`nav-dot ${active ? "nav-dot-active" : ""}`} onClick={onClick} title={label}>
      <span className="nav-dot-ring" />
      <span className="nav-dot-core" />
    </button>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const skillsRef = useRef(null);
  const sections = ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact"];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
            if (e.target.id === "skills") setSkillsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionLabels = {
    hero: "HOME",
    about: "ABOUT",
    skills: "SKILLS",
    projects: "PROJECTS",
    experience: "EXP",
    education: "EDU",
    certifications: "CERTS",
    contact: "CONTACT",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --neon-green: #00ff9f;
          --neon-cyan: #00cfff;
          --neon-purple: #bf00ff;
          --neon-pink: #ff0080;
          --bg-dark: #030810;
          --bg-card: #080f1e;
          --bg-card2: #0a1428;
          --text-main: #c8e6ff;
          --text-muted: #5a7fa8;
          --border-dim: #0f2040;
          --font-mono: 'Share Tech Mono', monospace;
          --font-display: 'Orbitron', sans-serif;
          --font-body: 'Rajdhani', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg-dark);
          color: var(--text-main);
          font-family: var(--font-body);
          overflow-x: hidden;
        }

        .scanlines {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,255,159,0.015) 2px, rgba(0,255,159,0.015) 4px
          );
        }

        .grid-bg {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,207,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,207,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem;
          background: rgba(3,8,16,0.92);
          border-bottom: 1px solid rgba(0,207,255,0.15);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: space-between;
          height: 60px;
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1rem; font-weight: 700;
          color: var(--neon-cyan);
          text-shadow: 0 0 15px var(--neon-cyan);
          letter-spacing: 2px;
          cursor: pointer;
        }

        .nav-links {
          display: flex; gap: 0.2rem;
        }

        .nav-link {
          font-family: var(--font-mono);
          font-size: 0.65rem; letter-spacing: 1px;
          padding: 6px 10px;
          background: none; border: none; cursor: pointer;
          color: var(--text-muted);
          transition: color 0.2s;
          position: relative;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--neon-cyan);
        }

        .nav-link.active::after {
          content: '';
          position: absolute; bottom: 0; left: 10%; right: 10%; height: 2px;
          background: var(--neon-cyan);
          box-shadow: 0 0 8px var(--neon-cyan);
        }

        .nav-menu-btn {
          display: none;
          background: none; border: 1px solid rgba(0,207,255,0.3);
          color: var(--neon-cyan); cursor: pointer;
          padding: 6px 10px; font-size: 1.2rem;
          border-radius: 4px;
        }

        .mobile-menu {
          display: none;
          position: fixed; top: 60px; left: 0; right: 0;
          background: rgba(3,8,16,0.97);
          border-bottom: 1px solid rgba(0,207,255,0.15);
          z-index: 99; padding: 1rem;
          flex-direction: column; gap: 0.5rem;
        }

        .mobile-menu.open { display: flex; }

        .mobile-nav-link {
          font-family: var(--font-mono);
          font-size: 0.75rem; letter-spacing: 2px;
          padding: 10px 16px;
          background: none; border: 1px solid rgba(0,207,255,0.1);
          color: var(--text-muted); cursor: pointer;
          text-align: left; border-radius: 4px;
          transition: all 0.2s;
        }

        .mobile-nav-link:hover { color: var(--neon-cyan); border-color: rgba(0,207,255,0.4); }

        section {
          position: relative; z-index: 1;
          padding: 80px 2rem;
          max-width: 1000px; margin: 0 auto;
        }

        /* HERO */
        #hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          text-align: center; padding-top: 120px;
          max-width: 100%;
        }

        .hero-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem; letter-spacing: 4px;
          color: var(--neon-green);
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900; line-height: 1;
          background: linear-gradient(135deg, #00ff9f, #00cfff, #bf00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(0,207,255,0.4));
          margin-bottom: 1.5rem;
          letter-spacing: 3px;
        }

        .hero-typewriter {
          font-family: var(--font-display);
          font-size: clamp(1rem, 3vw, 1.6rem);
          font-weight: 400; letter-spacing: 2px;
          color: var(--neon-cyan);
          text-shadow: 0 0 20px rgba(0,207,255,0.5);
          margin-bottom: 2rem;
          min-height: 2.5rem;
        }

        .cursor {
          animation: blink 1s step-end infinite;
          color: var(--neon-green);
        }

        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }

        .hero-desc {
          font-size: 1.05rem; line-height: 1.7;
          color: var(--text-muted); max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .hero-buttons {
          display: flex; gap: 1rem; flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          font-family: var(--font-display);
          font-size: 0.7rem; letter-spacing: 2px;
          padding: 12px 28px;
          background: transparent;
          border: 2px solid var(--neon-green);
          color: var(--neon-green);
          cursor: pointer; border-radius: 2px;
          text-decoration: none;
          transition: all 0.3s;
          text-shadow: 0 0 10px var(--neon-green);
          box-shadow: 0 0 20px rgba(0,255,159,0.1), inset 0 0 20px rgba(0,255,159,0.03);
          position: relative; overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,255,159,0.15), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover { background: rgba(0,255,159,0.08); box-shadow: 0 0 30px rgba(0,255,159,0.3); }
        .btn-primary:hover::before { left: 100%; }

        .btn-secondary {
          font-family: var(--font-display);
          font-size: 0.7rem; letter-spacing: 2px;
          padding: 12px 28px;
          background: transparent;
          border: 2px solid var(--neon-cyan);
          color: var(--neon-cyan);
          cursor: pointer; border-radius: 2px;
          text-decoration: none;
          transition: all 0.3s;
          text-shadow: 0 0 10px var(--neon-cyan);
          box-shadow: 0 0 20px rgba(0,207,255,0.1), inset 0 0 20px rgba(0,207,255,0.03);
        }

        .btn-secondary:hover { background: rgba(0,207,255,0.08); box-shadow: 0 0 30px rgba(0,207,255,0.3); }

        .hero-scroll {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 2px;
          color: var(--text-muted);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float { 0%,100% { transform: translateX(-50%) translateY(0) } 50% { transform: translateX(-50%) translateY(-8px) } }

        .scroll-arrow {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, var(--neon-cyan), transparent);
        }

        /* SECTION TITLE */
        .section-title-wrap { margin-bottom: 3rem; }
        .section-title-inner {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .section-bracket {
          font-family: var(--font-mono); font-size: 1.5rem;
          color: var(--neon-green); opacity: 0.6;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 4vw, 1.8rem);
          font-weight: 700; letter-spacing: 3px;
          color: var(--text-main);
          text-transform: uppercase;
        }

        .section-subtitle {
          font-family: var(--font-mono);
          font-size: 0.7rem; letter-spacing: 2px;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .section-line {
          height: 1px; background: linear-gradient(90deg, var(--neon-cyan), transparent);
          box-shadow: 0 0 8px rgba(0,207,255,0.3);
        }

        /* ABOUT */
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
          align-items: center;
        }

        .about-avatar {
          width: 180px; height: 180px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(0,255,159,0.1), rgba(0,207,255,0.1));
          border: 2px solid rgba(0,207,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-size: 3.5rem; font-weight: 900;
          color: var(--neon-cyan);
          text-shadow: 0 0 30px var(--neon-cyan);
          box-shadow: 0 0 40px rgba(0,207,255,0.1), inset 0 0 40px rgba(0,207,255,0.05);
          position: relative; margin: auto;
        }

        .about-avatar::after {
          content: '';
          position: absolute; inset: -8px; border-radius: 50%;
          border: 1px solid rgba(0,207,255,0.15);
          animation: orbit 6s linear infinite;
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.02); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .about-text { font-size: 1.05rem; line-height: 1.8; color: var(--text-muted); }
        .about-highlight { color: var(--neon-cyan); font-weight: 600; }

        .about-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1rem; margin-top: 2rem;
        }

        .stat-box {
          padding: 1rem;
          background: var(--bg-card);
          border: 1px solid rgba(0,207,255,0.1);
          border-radius: 4px; text-align: center;
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: 1.5rem; font-weight: 700;
          color: var(--neon-green);
          text-shadow: 0 0 10px var(--neon-green);
        }

        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.6rem; letter-spacing: 1px;
          color: var(--text-muted); margin-top: 4px;
        }

        /* SKILLS */
        .skills-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }

        .skill-item { margin-bottom: 1.5rem; }

        .skill-header {
          display: flex; justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .skill-name {
          font-family: var(--font-mono); font-size: 0.8rem;
          letter-spacing: 1px; color: var(--text-main);
        }

        .skill-pct {
          font-family: var(--font-mono); font-size: 0.75rem;
          font-weight: 600;
        }

        .skill-track {
          height: 4px; background: rgba(255,255,255,0.05);
          border-radius: 2px; overflow: hidden;
        }

        .skill-fill {
          height: 100%; border-radius: 2px;
          transition: width 1.5s cubic-bezier(0.4,0,0.2,1);
        }

        /* CARDS */
        .card {
          background: var(--bg-card);
          border: 1px solid rgba(0,207,255,0.1);
          border-radius: 4px; padding: 1.5rem;
          position: relative; overflow: hidden;
          transition: all 0.3s;
        }

        .card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
        }

        .card:hover {
          border-color: rgba(0,207,255,0.3);
          box-shadow: 0 0 30px rgba(0,207,255,0.05);
          transform: translateY(-2px);
        }

        .card-green::before { background: linear-gradient(90deg, var(--neon-green), transparent); }
        .card-cyan::before { background: linear-gradient(90deg, var(--neon-cyan), transparent); }
        .card-purple::before { background: linear-gradient(90deg, var(--neon-purple), transparent); }

        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        .project-icon {
          font-size: 2rem; margin-bottom: 1rem;
          filter: drop-shadow(0 0 8px rgba(0,207,255,0.5));
        }

        .project-title {
          font-family: var(--font-display);
          font-size: 1rem; font-weight: 700; letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }

        .project-desc {
          font-size: 0.9rem; line-height: 1.7;
          color: var(--text-muted); margin-bottom: 1rem;
        }

        .tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

        .tech-tag {
          font-family: var(--font-mono); font-size: 0.6rem;
          letter-spacing: 1px; padding: 3px 8px;
          border: 1px solid rgba(0,207,255,0.2);
          color: var(--neon-cyan); border-radius: 2px;
          background: rgba(0,207,255,0.05);
        }

        /* EXPERIENCE */
        .timeline { position: relative; padding-left: 2rem; }

        .timeline::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, var(--neon-green), transparent);
        }

        .timeline-item {
          position: relative; margin-bottom: 2rem;
        }

        .timeline-dot {
          position: absolute; left: -2rem; top: 0.4rem;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--neon-green);
          box-shadow: 0 0 10px var(--neon-green);
          transform: translateX(-4px);
        }

        .timeline-company {
          font-family: var(--font-display);
          font-size: 1rem; font-weight: 700;
          color: var(--neon-green);
          text-shadow: 0 0 10px rgba(0,255,159,0.3);
          margin-bottom: 0.25rem;
        }

        .timeline-role {
          font-family: var(--font-mono); font-size: 0.75rem;
          letter-spacing: 1px; color: var(--neon-cyan);
          margin-bottom: 0.5rem;
        }

        .timeline-period {
          font-family: var(--font-mono); font-size: 0.65rem;
          color: var(--text-muted); letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }

        .timeline-desc {
          font-size: 0.95rem; line-height: 1.7; color: var(--text-muted);
        }

        /* EDUCATION */
        .edu-grid { display: grid; gap: 1rem; }

        .edu-card {
          display: flex; align-items: flex-start; gap: 1.5rem;
        }

        .edu-year {
          font-family: var(--font-display); font-size: 0.7rem;
          font-weight: 700; letter-spacing: 1px;
          white-space: nowrap; padding-top: 0.2rem;
          min-width: 90px;
        }

        .edu-institution {
          font-family: var(--font-display); font-size: 0.95rem;
          font-weight: 700; margin-bottom: 0.25rem;
        }

        .edu-degree {
          font-family: var(--font-mono); font-size: 0.7rem;
          letter-spacing: 1px; color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .edu-cgpa {
          font-family: var(--font-mono); font-size: 0.65rem;
          color: var(--neon-green);
        }

        /* CERTS */
        .cert-card {
          display: flex; align-items: center; gap: 1.5rem;
        }

        .cert-icon {
          width: 50px; height: 50px;
          border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          background: rgba(0,255,159,0.1);
          border: 1px solid rgba(0,255,159,0.2);
          box-shadow: 0 0 15px rgba(0,255,159,0.1);
        }

        .cert-name {
          font-family: var(--font-display); font-size: 0.95rem;
          font-weight: 700; margin-bottom: 0.25rem;
          color: var(--neon-green);
        }

        .cert-issuer {
          font-family: var(--font-mono); font-size: 0.7rem;
          color: var(--text-muted); letter-spacing: 1px;
        }

        .cert-year {
          font-family: var(--font-mono); font-size: 0.65rem;
          color: var(--neon-cyan); margin-top: 0.25rem;
        }

        /* CONTACT */
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
        }

        .contact-links { display: flex; flex-direction: column; gap: 1rem; }

        .contact-link {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--bg-card);
          border: 1px solid rgba(0,207,255,0.1);
          border-radius: 4px; text-decoration: none;
          transition: all 0.3s;
        }

        .contact-link:hover {
          border-color: rgba(0,207,255,0.4);
          box-shadow: 0 0 20px rgba(0,207,255,0.1);
        }

        .contact-link-icon {
          font-size: 1.3rem;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
        }

        .contact-link-text {
          font-family: var(--font-mono); font-size: 0.75rem;
          letter-spacing: 1px; color: var(--text-main);
        }

        .contact-cta {
          background: var(--bg-card);
          border: 1px solid rgba(0,207,255,0.1);
          border-radius: 4px; padding: 2rem;
          display: flex; flex-direction: column; gap: 1rem;
          justify-content: center;
        }

        .contact-cta-title {
          font-family: var(--font-display); font-size: 1.1rem;
          font-weight: 700; color: var(--neon-cyan);
          text-shadow: 0 0 15px rgba(0,207,255,0.4);
        }

        .contact-cta-desc {
          font-size: 0.9rem; line-height: 1.7; color: var(--text-muted);
        }

        /* FOOTER */
        footer {
          position: relative; z-index: 1;
          text-align: center; padding: 2rem;
          border-top: 1px solid rgba(0,207,255,0.08);
          font-family: var(--font-mono); font-size: 0.65rem;
          letter-spacing: 2px; color: var(--text-muted);
        }

        footer span { color: var(--neon-green); }

        /* GLITCH */
        .glitch-wrapper { position: relative; display: inline-block; }
        .glitch { position: relative; display: inline-block; }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .glitch::before {
          animation: glitch1 4s infinite linear;
          color: var(--neon-cyan); clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          transform: translate(-3px, 0);
        }
        .glitch::after {
          animation: glitch2 4s infinite linear;
          color: var(--neon-purple); clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          transform: translate(3px, 0);
        }

        @keyframes glitch1 {
          0%, 90%, 100% { transform: translate(-3px,0); opacity: 0; }
          92% { transform: translate(-3px,-2px); opacity: 0.8; }
          94% { transform: translate(3px,2px); opacity: 0.8; }
          96% { transform: translate(-3px,0); opacity: 0; }
        }

        @keyframes glitch2 {
          0%, 90%, 100% { transform: translate(3px,0); opacity: 0; }
          93% { transform: translate(3px,2px); opacity: 0.8; }
          95% { transform: translate(-3px,-2px); opacity: 0.8; }
          97% { transform: translate(3px,0); opacity: 0; }
        }

        /* NAV DOTS */
        .nav-dots {
          position: fixed; right: 1.5rem; top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 12px;
          z-index: 99;
        }

        .nav-dot {
          background: none; border: none; cursor: pointer;
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }

        .nav-dot-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid rgba(0,207,255,0.2);
          transition: all 0.3s;
        }

        .nav-dot-core {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--text-muted);
          transition: all 0.3s;
        }

        .nav-dot-active .nav-dot-ring {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 8px rgba(0,207,255,0.5);
        }

        .nav-dot-active .nav-dot-core {
          background: var(--neon-cyan);
          box-shadow: 0 0 6px var(--neon-cyan);
        }

        /* CORNER DECORATIONS */
        .corner-dec {
          position: absolute;
          width: 20px; height: 20px;
          pointer-events: none;
        }

        .corner-dec.tl { top: 0; left: 0; border-top: 2px solid; border-left: 2px solid; }
        .corner-dec.tr { top: 0; right: 0; border-top: 2px solid; border-right: 2px solid; }
        .corner-dec.bl { bottom: 0; left: 0; border-bottom: 2px solid; border-left: 2px solid; }
        .corner-dec.br { bottom: 0; right: 0; border-bottom: 2px solid; border-right: 2px solid; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-menu-btn { display: block; }
          .nav-dots { display: none; }
          .about-grid { grid-template-columns: 1fr; }
          .about-avatar { width: 120px; height: 120px; font-size: 2.5rem; }
          .about-stats { grid-template-columns: repeat(3, 1fr); }
          .skills-grid { grid-template-columns: 1fr; }
          .projects-grid { grid-template-columns: 1fr; }
          .contact-grid { grid-template-columns: 1fr; }
          section { padding: 60px 1.25rem; }
        }
      `}</style>

      <div className="scanlines" />
      <div className="grid-bg" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => scrollTo("hero")}>PMC.DEV</div>
        <div className="nav-links">
          {sections.map((s) => (
            <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
              {sectionLabels[s]}
            </button>
          ))}
        </div>
        <button className="nav-menu-btn" onClick={() => setMenuOpen((o) => !o)}>☰</button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {sections.map((s) => (
          <button key={s} className="mobile-nav-link" onClick={() => scrollTo(s)}>{sectionLabels[s]}</button>
        ))}
      </div>

      {/* NAV DOTS */}
      <div className="nav-dots">
        {sections.map((s) => (
          <NavDot key={s} label={sectionLabels[s]} active={activeSection === s} onClick={() => scrollTo(s)} />
        ))}
      </div>

      {/* HERO */}
      <section id="hero">
        <div className="hero-tag">// INITIALIZING PORTFOLIO.EXE ...</div>
        <h1 className="hero-name">
          <GlitchText text="MANI CHARAN" />
        </h1>
        <div className="hero-typewriter">
          <TypewriterText texts={resumeData.taglines} />
        </div>
        <p className="hero-desc">{resumeData.summary}</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => scrollTo("projects")}>VIEW PROJECTS</button>
          <button className="btn-secondary" onClick={() => scrollTo("contact")}>CONTACT ME</button>
        </div>
        <div className="hero-scroll">
          <span>SCROLL</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <SectionTitle subtitle="// PLAYER_PROFILE.JSON">ABOUT</SectionTitle>
        <div className="about-grid">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="about-avatar">MC</div>
            <div className="about-stats">
              <div className="stat-box">
                <div className="stat-num">7.5</div>
                <div className="stat-label">B.TECH CGPA</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">8.2</div>
                <div className="stat-label">DIPLOMA CGPA</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">2+</div>
                <div className="stat-label">PROJECTS</div>
              </div>
            </div>
          </div>
          <div>
            <p className="about-text">
              A <span className="about-highlight">passionate technologist</span> diving deep into the world of{" "}
              <span className="about-highlight">Python & web development</span>. Currently pursuing B.Tech in Computer Science at{" "}
              <span className="about-highlight">Gurunanak Institution of Technology</span>.
            </p>
            <br />
            <p className="about-text">
              Experienced in <span className="about-highlight">collaborative whiteboard systems</span>, steganography, and real-world software development through an internship at{" "}
              <span className="about-highlight">GWING Software Technologies</span>.
            </p>
            <br />
            <p className="about-text">
              Driven by a passion for <span className="about-highlight">innovative engineering solutions</span> and user-friendly digital products.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillsRef}>
        <SectionTitle subtitle="// ABILITY_TREE.CONFIG">SKILLS</SectionTitle>
        <div className="skills-grid">
          {resumeData.skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} animate={skillsVisible} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <SectionTitle subtitle="// MISSION_LOG.ACTIVE">PROJECTS</SectionTitle>
        <div className="projects-grid">
          {resumeData.projects.map((project, i) => (
            <div key={i} className={`card ${i % 2 === 0 ? "card-green" : "card-cyan"}`} style={{ position: "relative" }}>
              <div className="corner-dec tl" style={{ borderColor: project.color, opacity: 0.5 }} />
              <div className="corner-dec tr" style={{ borderColor: project.color, opacity: 0.5 }} />
              <div className="corner-dec bl" style={{ borderColor: project.color, opacity: 0.5 }} />
              <div className="corner-dec br" style={{ borderColor: project.color, opacity: 0.5 }} />
              <div className="project-icon">{project.icon}</div>
              <div className="project-title" style={{ color: project.color, textShadow: `0 0 15px ${project.color}50` }}>
                {project.title}
              </div>
              <p className="project-desc">{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <SectionTitle subtitle="// QUEST_HISTORY.LOG">EXPERIENCE</SectionTitle>
        <div className="timeline">
          {resumeData.experience.map((exp, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}` }} />
              <div className="card card-green" style={{ position: "relative" }}>
                <div className="corner-dec tl" style={{ borderColor: exp.color, opacity: 0.4 }} />
                <div className="corner-dec tr" style={{ borderColor: exp.color, opacity: 0.4 }} />
                <div className="corner-dec bl" style={{ borderColor: exp.color, opacity: 0.4 }} />
                <div className="corner-dec br" style={{ borderColor: exp.color, opacity: 0.4 }} />
                <div className="timeline-company">{exp.company}</div>
                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-period">⏱ {exp.period}</div>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <SectionTitle subtitle="// SKILL_TREE.UNLOCKED">EDUCATION</SectionTitle>
        <div className="edu-grid">
          {resumeData.education.map((edu, i) => (
            <div key={i} className={`card ${["card-green", "card-cyan", "card-purple"][i % 3]}`}>
              <div className="edu-card">
                <div className="edu-year" style={{ color: edu.color, textShadow: `0 0 10px ${edu.color}50` }}>
                  {edu.period}
                </div>
                <div>
                  <div className="edu-institution" style={{ color: edu.color }}>{edu.institution}</div>
                  <div className="edu-degree">{edu.degree}</div>
                  <div className="edu-cgpa">CGPA: {edu.cgpa}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications">
        <SectionTitle subtitle="// ACHIEVEMENT_UNLOCKED">CERTIFICATIONS</SectionTitle>
        <div style={{ display: "grid", gap: "1rem" }}>
          {resumeData.certifications.map((cert, i) => (
            <div key={i} className="card card-green">
              <div className="cert-card">
                <div className="cert-icon">🏆</div>
                <div>
                  <div className="cert-name">{cert.title}</div>
                  <div className="cert-issuer">{cert.issuer}</div>
                  <div className="cert-year">ISSUED: {cert.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <SectionTitle subtitle="// ESTABLISH_CONNECTION">CONTACT</SectionTitle>
        <div className="contact-grid">
          <div className="contact-links">
            <a href={`mailto:${resumeData.contact.email}`} className="contact-link">
              <div className="contact-link-icon">📧</div>
              <div>
                <div className="contact-link-text">{resumeData.contact.email}</div>
              </div>
            </a>
            <a href={`tel:${resumeData.contact.phone}`} className="contact-link">
              <div className="contact-link-icon">📱</div>
              <div>
                <div className="contact-link-text">{resumeData.contact.phone}</div>
              </div>
            </a>
            <a href={resumeData.contact.github} target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">🐙</div>
              <div>
                <div className="contact-link-text">github.com/Saivarshith08</div>
              </div>
            </a>
            <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">💼</div>
              <div>
                <div className="contact-link-text">LinkedIn Profile</div>
              </div>
            </a>
          </div>

          <div className="contact-cta">
            <div className="contact-cta-title">READY TO COLLABORATE?</div>
            <p className="contact-cta-desc">
              Looking for entry-level opportunities to apply skills, grow professionally, and contribute effectively to organizational objectives. Let's build something great together.
            </p>
            <a href={`mailto:${resumeData.contact.email}`} className="btn-primary" style={{ textAlign: "center", textDecoration: "none", display: "block" }}>
              SEND MESSAGE
            </a>
          </div>
        </div>
      </section>

      <footer>
        <p>MANI CHARAN PUPPALA · PORTFOLIO <span>2025</span> · BUILT WITH <span>♥</span> & CODE</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.55rem" }}>
          DEPLOY: GITHUB → VERCEL · DOMAIN: <span>yourname.vercel.app</span>
        </p>
      </footer>
    </>
  );
}
