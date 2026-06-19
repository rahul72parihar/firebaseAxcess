import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaPhone,
  FaRupeeSign,
  FaCalendarAlt,
  FaPaperPlane,
  FaInfoCircle,
  FaCheck,
  FaTimes,
  FaLock,
} from "react-icons/fa";
import Header from "../../components/Header.jsx";
import "./SessionEndedPage.css";

export default function SessionEndedPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [requested, setRequested] = useState(false);

  // TODO(api): fetch from GET /api/host/sessions/:id/summary — replace hardcoded
  // totalCalls / totalEarning with the real values for the session that just ended.
  const totalCalls = 28;
  const totalEarning = 4200;

  const handleConfirm = () => {
    // TODO(api): call POST /api/host/payouts/request (sessionId, amount) here;
    // only flip to the "Payment Requested" UI state after a successful response,
    // and surface errors (e.g. failed payout request) to the user.
    setRequested(true);
    setShowModal(false);
  };

  return (
    <div className="se-page">
      <Header mode="create" />

      <main className="se-main">
        <div className="se-content">

          {/* Hero */}
          <div className="se-hero">
            <div className="se-confetti" aria-hidden="true">
              <span className="se-dot se-dot--purple1" />
              <span className="se-dot se-dot--pink" />
              <span className="se-dot se-dot--green" />
              <span className="se-dot se-dot--orange" />
              <span className="se-dot se-dot--purple2" />
              <span className="se-dot se-dot--blue" />
              <span className="se-dot se-dot--yellow" />
              <span className="se-dot se-dot--teal" />
            </div>
            <div className="se-check-outer">
              <div className="se-check-circle">
                <svg viewBox="0 0 24 24" fill="none" className="se-checkmark">
                  <polyline points="20 6 9 17 4 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <h1 className="se-title">Session Ended Successfully!</h1>
            <p className="se-subtitle">
              Great job, Aisha! Here's how your live session performed.
            </p>
          </div>

          {/* Session Summary */}
          <section className="se-card">
            <div className="se-section-header">
              <span className="se-section-icon"><FaChartBar /></span>
              <h2 className="se-section-title">Session Summary</h2>
            </div>
            <div className="se-stats-grid">
              <div className="se-stat-box">
                <span className="se-stat-icon-wrap purple"><FaPhone /></span>
                <div className="se-stat-info">
                  <span className="se-stat-label">Total Calls</span>
                  <span className="se-stat-number">{totalCalls}</span>
                  <span className="se-stat-note">Users connected with you</span>
                </div>
              </div>
              <div className="se-stat-box">
                <span className="se-stat-icon-wrap green"><FaRupeeSign /></span>
                <div className="se-stat-info">
                  <span className="se-stat-label">Total Earning</span>
                  <span className="se-stat-number">₹{totalEarning.toLocaleString("en-IN")}</span>
                  <span className="se-stat-note">Earnings from this session</span>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Request */}
          <section className="se-card">
            <div className="se-section-header">
              <span className="se-section-icon"><FaCalendarAlt /></span>
              <h2 className="se-section-title">Payment Request</h2>
            </div>
            <p className="se-payment-desc">
              Your earnings will be transferred once you request a payment.
            </p>
            <div className="se-payment-box">
              <div className="se-payment-earned">
                <span className="se-payment-earned-label">You Earned</span>
                <span className="se-payment-amount">₹{totalEarning.toLocaleString("en-IN")}</span>
                <span className="se-payment-earned-note">Earnings from this session</span>
              </div>
              {requested ? (
                <div className="se-requested-badge">
                  <FaCheck />
                  Payment Requested
                </div>
              ) : (
                <button className="se-request-btn" onClick={() => setShowModal(true)}>
                  <FaPaperPlane />
                  Request Payment
                </button>
              )}
            </div>
            <p className="se-payout-note">
              <FaInfoCircle className="se-payout-note-icon" />
              Payout will be transferred to your account within 2-3 business days.
            </p>
          </section>

          {/* Back to dashboard */}
          <button className="se-dashboard-btn" onClick={() => navigate("/")}>
            Back to Dashboard
          </button>

        </div>
      </main>

      {/* Payment Modal */}
      {showModal && (
        <div className="se-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="se-modal" onClick={(e) => e.stopPropagation()}>
            <button className="se-modal-close" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>

            <div className="se-modal-icon-wrap">
              <FaRupeeSign className="se-modal-rupee" />
            </div>

            <h3 className="se-modal-title">Request Payment</h3>
            <p className="se-modal-subtitle">
              You're about to request a payout for your session earnings.
            </p>

            <div className="se-modal-amount-box">
              <span className="se-modal-amount-label">Total Amount</span>
              <span className="se-modal-amount">₹{totalEarning.toLocaleString("en-IN")}</span>
              <span className="se-modal-amount-note">From {totalCalls} calls this session</span>
            </div>

            <div className="se-modal-info">
              <FaInfoCircle className="se-modal-info-icon" />
              <span>Payout will be transferred within 2-3 business days.</span>
            </div>

            <div className="se-modal-actions">
              <button className="se-modal-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="se-modal-confirm" onClick={handleConfirm}>
                <FaPaperPlane />
                Confirm Request
              </button>
            </div>

            <p className="se-modal-secure">
              <FaLock />
              Secured & encrypted transfer
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
