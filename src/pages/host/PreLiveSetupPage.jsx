import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaRupeeSign,
  FaShieldAlt,
  FaClock,
  FaCheck,
  FaLock,
  FaBroadcastTower,
  FaLightbulb,
} from "react-icons/fa";
import Header from "../../components/Header.jsx";
import "./PreLiveSetupPage.css";

export default function PreLiveSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { duration = 120, time = "9 PM" } = location.state || {};

  const checklist = [
    "You'll be connected with users one by one.",
    "Users will be called in the booked order.",
    "Users are alerted automatically before their turn.",
    "You can end the session at any time.",
  ];

  return (
    <div className="pls-page">
      <Header mode="create" />

      <main className="pls-main">
        <div className="pls-content">

          {/* Hero */}
          <div className="pls-hero">
            <div className="pls-hero-text">
              <h1 className="pls-hero-title">Pre-Live Setup</h1>
              <p className="pls-hero-subtitle">
                You're almost live! Review your session details and get ready to go on air.
              </p>
            </div>
            <div className="pls-hero-illustration">
              <div className="pls-mic-circle">
                <span className="pls-mic-emoji">🎙️</span>
              </div>
              <div className="pls-logo-badge">
                <FaBroadcastTower />
              </div>
            </div>
          </div>

          {/* Section 1 – Session Overview */}
          <section className="pls-card">
            <div className="pls-section-header">
              <span className="pls-section-icon">
                <FaCalendarAlt />
              </span>
              <h2 className="pls-section-title">1. Session Overview</h2>
            </div>

            <div className="pls-stats-grid">
              {/* Session Time */}
              <div className="pls-stat-cell">
                <FaClock className="pls-stat-icon gray" />
                <span className="pls-stat-label">Session Time</span>
                <span className="pls-stat-value">{duration} min</span>
              </div>

              {/* Total Booked */}
              <div className="pls-stat-cell bordered">
                <span className="pls-stat-label">Total Booked</span>
                <div className="pls-stat-row">
                  <FaUserFriends className="pls-stat-icon gray" />
                  <span className="pls-stat-value large">24+ Users</span>
                </div>
                <p className="pls-stat-note">
                  More bookings can come during the session <FaShieldAlt className="pls-inline-icon" />
                </p>
              </div>

              {/* Expected Earning */}
              <div className="pls-stat-cell bordered">
                <span className="pls-stat-label top">Expected<br />Earning</span>
                <div className="pls-stat-row">
                  <span className="pls-rupee-circle">
                    <FaRupeeSign />
                  </span>
                  <span className="pls-stat-value large">₹4,200+</span>
                </div>
                <p className="pls-stat-note">
                  Earnings may increase as more bookings come in <FaShieldAlt className="pls-inline-icon" />
                </p>
              </div>

              {/* Security */}
              <div className="pls-stat-cell">
                <FaShieldAlt className="pls-stat-icon gray" />
                <span className="pls-stat-label">Security</span>
                <span className="pls-stat-value accent">Encrypted</span>
              </div>
            </div>

            <div className="pls-divider" />

            {/* Session Start Time */}
            <div className="pls-start-time">
              <div className="pls-start-time-header">
                <FaClock className="pls-start-icon" />
                <span className="pls-start-label">Session Start Time</span>
              </div>
              <p className="pls-start-desc">
                Your session is set to start at{" "}
                <span className="pls-time-badge">
                  <FaClock className="pls-time-badge-icon" />
                  {time === "9 PM" ? "9:00 PM" : time}
                </span>
              </p>
              <p className="pls-start-note">This time cannot be changed.</p>
            </div>
          </section>

          {/* Section 2 – Before You Go Live */}
          <section className="pls-card">
            <div className="pls-section-header">
              <span className="pls-section-icon">
                <FaCalendarAlt />
              </span>
              <h2 className="pls-section-title">2. Before You Go Live</h2>
            </div>
            <ul className="pls-checklist">
              {checklist.map((item) => (
                <li key={item} className="pls-checklist-item">
                  <span className="pls-check-circle">
                    <FaCheck />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Go Live CTA */}
          <div className="pls-go-live-card">
            <div className="pls-go-live-text">
              <h3 className="pls-go-live-title">Ready to go live?</h3>
              <p className="pls-go-live-sub">
                Once you go live, the session timer will start and users will be connected in order.
              </p>
            </div>
            <div className="pls-go-live-right">
              <button
                className="pls-go-live-btn"
                onClick={() => navigate("/host/live")}
              >
                <FaBroadcastTower />
                GO LIVE
              </button>
              <p className="pls-go-live-secure">
                <FaLock />
                Calls are secure and encrypted
              </p>
            </div>
          </div>

          {/* Tip */}
          <div className="pls-tip-card">
            <div className="pls-tip-left">
              <div className="pls-tip-header">
                <FaLightbulb className="pls-tip-icon" />
                <span className="pls-tip-title">Tip</span>
              </div>
              <p className="pls-tip-text">
                Make sure you're in a quiet place with a stable internet connection for the best experience.
              </p>
            </div>
            <div className="pls-headphone-illustration">
              <span className="pls-headphone-emoji">🎧</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
