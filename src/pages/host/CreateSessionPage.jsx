import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaCheck,
  FaCalendarAlt,
  FaDollarSign,
  FaArrowRight,
  FaInfoCircle,
  FaShieldAlt,
  FaLightbulb,
  FaBroadcastTower,
} from "react-icons/fa";
import Header from "../../components/Header.jsx";
import "./CreateSessionPage.css";

// TODO(api): fetch from GET /api/host/session-config — duration options, badges,
// and selling points may be host-tier or campaign specific rather than fixed.
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
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState(120);

  // TODO(api): "earning potential" is a local heuristic — replace with a real
  // estimate from the API (e.g. GET /api/host/earning-estimate?duration=...).
  const earningPotential = selectedDuration >= 120 ? "Higher" : selectedDuration >= 90 ? "High" : "Moderate";

  return (
    <div className="axcess-page">
      <Header mode="create" />

      {/* 3-step stepper */}
      <div className="axcess-stepper">
        <div className="axcess-step">
          <span className="axcess-step-number active">1</span>
          <div className="axcess-step-info">
            <span className="axcess-step-label active">Pre Setup</span>
            <span className="axcess-step-sublabel active">Duration</span>
          </div>
        </div>
        <div className="axcess-step-divider" />
        <div className="axcess-step">
          <span className="axcess-step-number inactive">2</span>
          <div className="axcess-step-info">
            <span className="axcess-step-label inactive">Create &amp; Share</span>
            <span className="axcess-step-sublabel inactive">Share your session</span>
          </div>
        </div>
        <div className="axcess-step-divider" />
        <div className="axcess-step">
          <span className="axcess-step-number inactive">3</span>
          <div className="axcess-step-info">
            <span className="axcess-step-label inactive">Go Live</span>
            <span className="axcess-step-sublabel inactive">Start connecting</span>
          </div>
        </div>
      </div>

      <main className="axcess-main">
        <div className="axcess-content">
          {/* Duration */}
          <section className="axcess-card">
            <h1 className="axcess-card-title">
              Choose a duration for your 1-on-1 audio session.
            </h1>
            <div className="axcess-duration-grid">
              {DURATIONS.map((d) => {
                const isSelected = selectedDuration === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDuration(d.id)}
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

          {/* Go Live Now notice (replaces scheduled start-time picker) */}
          <section className="axcess-card">
            <div className="axcess-important-card">
              <span className="axcess-important-badge">
                <FaBroadcastTower />
                Go Live Now
              </span>
              <div className="axcess-important-body">
                <span className="axcess-important-icon-wrap">
                  <FaBroadcastTower className="axcess-important-icon" />
                </span>
                <div className="axcess-important-divider" />
                <div className="axcess-important-text">
                  <h3 className="axcess-important-title">
                    Your session goes live <span className="axcess-important-accent">as soon as you start it</span>
                  </h3>
                  <p className="axcess-important-desc">
                    There's no need to schedule a time — set your duration, share your link on the next step, and go live whenever you're ready.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pre Setup Overview */}
          <section className="axcess-card">
            <h3 className="axcess-card-title">Pre Setup Overview</h3>
            <p className="axcess-overview-subtitle">Review your session details before proceeding.</p>
            <div className="axcess-overview-rows">
              <div className="axcess-overview-row">
                <div className="axcess-overview-left">
                  <span className="axcess-overview-icon-wrap">
                    <FaClock />
                  </span>
                  <span className="axcess-overview-label">Duration</span>
                </div>
                <span className="axcess-overview-value">{selectedDuration} Minutes</span>
              </div>
              <div className="axcess-overview-row">
                <div className="axcess-overview-left">
                  <span className="axcess-overview-icon-wrap">
                    <FaCalendarAlt />
                  </span>
                  <span className="axcess-overview-label">Go Live</span>
                </div>
                <span className="axcess-overview-value">Now</span>
              </div>
              <div className="axcess-overview-row">
                <div className="axcess-overview-left">
                  <span className="axcess-overview-icon-wrap">
                    <FaDollarSign />
                  </span>
                  <span className="axcess-overview-label">Earning Potential</span>
                </div>
                <div className="axcess-overview-value-wrap">
                  <span className="axcess-overview-value-green">{earningPotential}</span>
                  <FaInfoCircle className="axcess-overview-info-icon" />
                </div>
              </div>
            </div>
          </section>

          {/* Tip */}
          <div className="axcess-tip-card">
            <div className="axcess-tip-header">
              <FaLightbulb />
              <span className="axcess-tip-title">Tip</span>
            </div>
            <p className="axcess-tip-text">
              90 min sessions get more participation from followers.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="axcess-footer">
        <div className="axcess-footer-inner">
          <div className="axcess-footer-top">
            <div>
              <p className="axcess-footer-heading">Ready for the next step?</p>
              <p className="axcess-footer-subtext">You can share your session link and invite users to join.</p>
            </div>
            {/* TODO(api): persist the session draft via POST /api/host/sessions
                (duration + start time) before navigating, so it survives reloads
                and PreLiveSetupPage/LivePage can fetch it by session id instead
                of relying solely on router state. */}
            <button
              className="axcess-cta-btn"
              onClick={() => navigate("/host/prelive", { state: { duration: selectedDuration } })}
            >
              Pre Setup
              <FaArrowRight />
            </button>
          </div>
          <p className="axcess-footer-secondary">You can go live in the next step</p>
          <p className="axcess-footer-note">
            <FaShieldAlt />
            You're in control. You can manage your session and calls easily while live.
          </p>
        </div>
      </footer>
    </div>
  );
}
