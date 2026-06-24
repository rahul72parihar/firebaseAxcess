import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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
  FaLink,
  FaRegCopy,
  FaTimes,
} from "react-icons/fa";
import Header from "../../components/Header.jsx";
import { db } from "../../firebase";
import { DEMO_CHANNEL } from "../../services/agora";
import "./PreLiveSetupPage.css";

const GO_LIVE_COUNTDOWN_SECONDS = 5;

export default function PreLiveSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hostUid = useSelector((s) => s.auth.uid);
  const { duration = 120 } = location.state || {};

  const [copied, setCopied] = useState(false);
  const [showGoLiveModal, setShowGoLiveModal] = useState(false);
  const [countdown, setCountdown] = useState(GO_LIVE_COUNTDOWN_SECONDS);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!showGoLiveModal) return;

    setCountdown(GO_LIVE_COUNTDOWN_SECONDS);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [showGoLiveModal]);

  const openGoLiveModal = () => setShowGoLiveModal(true);

  const cancelGoLive = () => {
    clearInterval(intervalRef.current);
    setShowGoLiveModal(false);
  };

  const confirmGoLive = async () => {
    if (countdown > 0) return;
    clearInterval(intervalRef.current);

    // Marks this host's channel as live so QueuePage can discover it and
    // route users into the same Agora channel for the call. Pinned to
    // DEMO_CHANNEL — see services/agora.js for why (temp token is
    // channel-specific). LivePage re-writes this doc on mount too.
    if (hostUid) {
      await setDoc(doc(db, "liveSessions", hostUid), {
        hostUid,
        channelName: DEMO_CHANNEL,
        duration,
        status: "live",
        startedAt: serverTimestamp(),
      }).catch(console.error);
    }

    navigate("/host/live");
  };

  // Real, working link: opens JoinSessionPage for this host, which waits
  // for liveSessions/{hostUid} to flip to "live" and then drops the user
  // straight into the call.
  const sessionUrl = `${window.location.origin}/join/${hostUid ?? ""}`;
  const sessionLink = sessionUrl.replace(/^https?:\/\//, "");

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(sessionUrl).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // TODO(api): once sessions are persisted (see CreateSessionPage TODO), fetch
  // this page's data by session id from GET /api/host/sessions/:id instead of
  // relying only on navigation state — covers the case of a page refresh/direct link.

  // TODO(api): "Total Booked" (24+ Users), "Expected Earning" (₹4,200+) below are
  // hardcoded placeholders — fetch real booking/earning projections from
  // GET /api/host/sessions/:id/overview.

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

          {/* Important notice */}
          <div className="pls-important-card">
            <span className="pls-important-badge">
              <FaBroadcastTower />
              Go Live Now
            </span>
            <div className="pls-important-body">
              <span className="pls-important-icon-wrap">
                <FaBroadcastTower className="pls-important-icon" />
              </span>
              <div className="pls-important-divider" />
              <div className="pls-important-text">
                <h3 className="pls-important-title">
                  Share your link, then go live <span className="pls-important-accent">whenever you're ready</span>
                </h3>
                <p className="pls-important-desc">
                  There's no scheduled start time — post your link now so people can see your story and book a slot before you start.
                </p>
              </div>
            </div>
          </div>

          {/* Create & Share */}
          <section className="pls-card">
            <h2 className="pls-share-title">Create &amp; Share</h2>
            <p className="pls-share-subtitle">
              Your session link is generated. Share it with people to join your session.
            </p>

            <div className="pls-link-box">
              <div className="pls-link-left">
                <FaLink />
                <span className="pls-link-text">{sessionLink}</span>
              </div>
              <button onClick={handleCopy} className="pls-copy-btn">
                <FaRegCopy />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <div className="pls-success-box">
              <span className="pls-success-icon">
                <FaCheck strokeWidth={3} />
              </span>
              <div>
                <p className="pls-success-title">Session link is generated!</p>
                <p className="pls-success-text">
                  People can now use this link to join your session.
                </p>
              </div>
            </div>
          </section>

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

            {/* Session Start */}
            <div className="pls-start-time">
              <div className="pls-start-time-header">
                <FaBroadcastTower className="pls-start-icon" />
                <span className="pls-start-label">Session Start</span>
              </div>
              <p className="pls-start-desc">
                Your session goes live{" "}
                <span className="pls-time-badge">
                  <FaBroadcastTower className="pls-time-badge-icon" />
                  As soon as you go live
                </span>
              </p>
              <p className="pls-start-note">No scheduled time — you're in control.</p>
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
                onClick={openGoLiveModal}
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

      {/* Go Live confirmation modal */}
      {showGoLiveModal && (
        <div className="pls-modal-overlay" onClick={cancelGoLive}>
          <div className="pls-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pls-modal-close" onClick={cancelGoLive}>
              <FaTimes />
            </button>

            <div className="pls-modal-icon-wrap">
              <FaBroadcastTower className="pls-modal-icon" />
            </div>

            <h3 className="pls-modal-title">Go live now?</h3>
            <p className="pls-modal-subtitle">
              Once you go live, users will start connecting with you one by one.
              Make sure you're ready before continuing.
            </p>

            <div className="pls-modal-actions">
              <button className="pls-modal-cancel" onClick={cancelGoLive}>
                Cancel
              </button>
              <button
                className="pls-modal-confirm"
                onClick={confirmGoLive}
                disabled={countdown > 0}
              >
                <FaBroadcastTower />
                {countdown > 0 ? `Go Live (${countdown}s)` : "Go Live"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
