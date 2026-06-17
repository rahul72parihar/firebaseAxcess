import { useNavigate } from "react-router-dom";
import musicImg from "../assets/musicicon.png";
import "./DevNav.css";

const SECTIONS = [
  {
    label: "User Flow",
    color: "#4f46e5",
    bg: "#eef2ff",
    pages: [
      { name: "Home", path: "/home", desc: "Landing page with host discovery" },
      { name: "Queue", path: "/queue", desc: "Waiting room before a call" },
      { name: "Call", path: "/call", desc: "Live 1-on-1 audio call screen" },
    ],
  },
  {
    label: "Host Flow",
    color: "#7c3aed",
    bg: "#f5f3ff",
    pages: [
      { name: "Pre Setup", path: "/host/session", desc: "Pick duration & start time" },
      { name: "Pre-Live Setup", path: "/host/prelive", desc: "Review session before going live" },
      { name: "Live Page", path: "/host/live", desc: "Manage the live session" },
      { name: "Session Ended", path: "/host/session-ended", desc: "Post-session summary & payout" },
    ],
  },
  {
    label: "Legal",
    color: "#0f766e",
    bg: "#f0fdfa",
    pages: [
      { name: "Terms & Conditions", path: "/terms", desc: "Platform terms of service" },
      { name: "Privacy Policy", path: "/privacy", desc: "Data & privacy information" },
      { name: "Community Guidelines", path: "/guidelines", desc: "Community standards" },
      { name: "Host Terms", path: "/host/terms", desc: "Terms for hosts" },
      { name: "Host Guidelines", path: "/host/guidelines", desc: "Guidelines for hosts" },
      { name: "Host Support", path: "/host/support", desc: "Support resources for hosts" },
    ],
  },
];

export default function DevNav() {
  const navigate = useNavigate();

  return (
    <div className="devnav-page">
      <div className="devnav-header">
        <div className="devnav-logo">
          <img src={musicImg} alt="Axcess" className="devnav-logo-icon" />
          <span className="devnav-logo-text">Axcess</span>
        </div>
        <div className="devnav-badge">Dev Navigator</div>
      </div>

      <div className="devnav-hero">
        <h1 className="devnav-title">Page Directory</h1>
        <p className="devnav-subtitle">Click any page to navigate directly to it.</p>
      </div>

      <div className="devnav-sections">
        {SECTIONS.map((section) => (
          <div key={section.label} className="devnav-section">
            <div className="devnav-section-label" style={{ color: section.color }}>
              <span className="devnav-section-dot" style={{ background: section.color }} />
              {section.label}
            </div>
            <div className="devnav-grid">
              {section.pages.map((page) => (
                <button
                  key={page.path}
                  className="devnav-card"
                  style={{ "--accent": section.color, "--accent-bg": section.bg }}
                  onClick={() => navigate(page.path)}
                >
                  <div className="devnav-card-icon" style={{ background: section.bg, color: section.color }}>
                    {page.name.charAt(0)}
                  </div>
                  <div className="devnav-card-body">
                    <span className="devnav-card-name">{page.name}</span>
                    <span className="devnav-card-desc">{page.desc}</span>
                    <span className="devnav-card-path">{page.path}</span>
                  </div>
                  <svg className="devnav-card-arrow" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
