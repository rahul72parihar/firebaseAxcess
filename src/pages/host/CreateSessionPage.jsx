import { useState } from "react";
import {
  FaClock,
  FaLink,
  FaCopy,
  FaCheck,
  FaCalendarAlt,
  FaDollarSign,
  FaTrophy,
  FaArrowRight,
  FaPencilAlt,

  FaInfoCircle,
  FaThLarge,
  FaLock,
} from "react-icons/fa";
import Header from "../../components/Header.jsx";
import "./CreateSessionPage.css";


const DURATIONS = [
  {
    id: 60,
    label: "Minutes",
    badge: null,
    points: ["More conversations", "Great for engagement"],
  },
  {
    id: 90,
    label: "Minutes",
    badge: "Recommended",
    points: ["Balanced duration", "High earning potential"],
  },
  {
    id: 120,
    label: "Minutes",
    badge: null,
    points: ["Maximum time", "Higher earnings"],
  },
];

export default function CreateSessionPage() {
  // Aliases removed: use imported Fa* icons directly

  const [selected, setSelected] = useState(90);
  const [copied, setCopied] = useState(false);

  const sessionLink = "axcess.live/aisha/session-12345";

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(`https://${sessionLink}`).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="axcess-page">
      {/* Header */}
      <Header mode="create" />


      {/* Stepper */}
      <div className="axcess-stepper">
        <div className="axcess-step">
          <span className="axcess-step-number active">1</span>
          <span className="axcess-step-label active">Create &amp; Share</span>
        </div>
        <div className="axcess-step-divider" />
        <div className="axcess-step">
          <span className="axcess-step-number inactive">2</span>
          <span className="axcess-step-label inactive">Livepage</span>
        </div>
      </div>

      {/* Main content */}
      <main className="axcess-main">
        <div className="axcess-content">
          {/* Duration card */}
          <section className="axcess-card">
            <h1 className="axcess-card-title">
              Choose a duration for your 1-on-1 audio session.
            </h1>
            <div className="axcess-duration-grid">
              {DURATIONS.map((d) => {
                const isSelected = selected === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelected(d.id)}
                    className={`axcess-duration-card ${isSelected ? "selected" : ""}`}
                  >
                    <div className="axcess-duration-card-header">
                      {d.badge ? (
                        <span className="axcess-duration-badge">{d.badge}</span>
                      ) : (
                        <span />
                      )}
                      {isSelected ? (
                        <span className="axcess-radio-selected">
                          <FaCheck strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="axcess-radio-empty" />
                      )}
                    </div>

                    <div className="axcess-duration-center">
                        <span className="axcess-duration-icon-wrap">
                        <FaClock />
                      </span>
                      <span className="axcess-duration-number">{d.id}</span>
                      <span className="axcess-duration-label">{d.label}</span>
                    </div>

                    <div className="axcess-duration-points">
                      {d.points.map((p) => (
                        <div key={p} className="axcess-duration-point">
                          <span className="axcess-point-check">
                            <FaCheck strokeWidth={3} />
                          </span>
                          <span className="axcess-point-text">{p}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Create & Share */}
          <section className="axcess-card">
            <h2 className="axcess-card-title" style={{ marginBottom: 0 }}>
              Create &amp; Share
            </h2>
            <p className="axcess-share-subtitle">
              Your session link is generated. Share it with people to join your session.
            </p>

            <div className="axcess-link-box">
              <div className="axcess-link-left">
                <FaLink />
                <span className="axcess-link-text">{sessionLink}</span>
              </div>
              <button onClick={handleCopy} className="axcess-copy-btn">
                <FaCopy />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <div className="axcess-success-box">
              <span className="axcess-success-icon">
                <FaCheck strokeWidth={3} />
              </span>
              <div>
                <p className="axcess-success-title">Session link is generated!</p>
                <p className="axcess-success-text">
                  People can now use this link to join your session.
                </p>
              </div>
            </div>
          </section>

          {/* Overview + Tip */}
          <section className="axcess-overview-grid">
            <div className="axcess-card" style={{ flexShrink: 0 }}>
              <h3 className="axcess-card-title">Session Overview</h3>
              <div className="axcess-overview-rows">
                <div className="axcess-overview-row">
                  <div className="axcess-overview-left">
                      <span className="axcess-overview-icon-wrap">
                      <FaClock />
                    </span>
                    <span className="axcess-overview-label">Duration</span>
                  </div>
                  <span className="axcess-overview-value">{selected} Minutes</span>
                </div>
                <div className="axcess-overview-row">
                  <div className="axcess-overview-left">
                    <span className="axcess-overview-icon-wrap">
                    <FaCalendarAlt />
                    </span>
                    <span className="axcess-overview-label">Live Session</span>
                  </div>
                  <div className="axcess-overview-value-wrap">
                    <span className="axcess-overview-value">Today</span>
                    <FaPencilAlt />
                  </div>
                </div>
                <div className="axcess-overview-row">
                  <div className="axcess-overview-left">
                    <span className="axcess-overview-icon-wrap">
                      <FaDollarSign />
                    </span>
                    <span className="axcess-overview-label">Earning Potential</span>
                  </div>
                  <div className="axcess-overview-value-wrap">
                    <span className="axcess-overview-value-green">Higher</span>
                    <FaInfoCircle />
                  </div>
                </div>
              </div>
            </div>

            <div className="axcess-tip-card">
              <div className="axcess-tip-header">
                <FaTrophy />
                <span className="axcess-tip-title">Tip</span>
              </div>
              <p className="axcess-tip-text">
                90 min sessions get more participation from followers.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="axcess-footer">
        <div className="axcess-footer-inner">
          <button className="axcess-cta-btn">
            <FaThLarge />
            Go to Dashboard &amp; Go Live
            <FaArrowRight />
          </button>
          <p className="axcess-footer-note">
            <FaLock />
            You can edit these settings anytime before going live.
          </p>
        </div>
      </footer>
    </div>
  );
}