import { useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaPhone,
  FaRupeeSign,
  FaCalendarAlt,
  FaPaperPlane,
  FaInfoCircle,
} from "react-icons/fa";
import Header from "../../components/Header.jsx";
import "./SessionEndedPage.css";

export default function SessionEndedPage() {
  const navigate = useNavigate();

  const totalCalls = 28;
  const totalEarning = 4200;

  return (
    <div className="se-page">
      <Header mode="create" />

      <main className="se-main">
        <div className="se-content">

          {/* Hero – success illustration */}
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
                <FaPhone className="se-check-icon" style={{ display: "none" }} />
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
              <span className="se-section-icon">
                <FaChartBar />
              </span>
              <h2 className="se-section-title">Session Summary</h2>
            </div>

            <div className="se-stats-grid">
              {/* Total Calls */}
              <div className="se-stat-box">
                <span className="se-stat-icon-wrap purple">
                  <FaPhone />
                </span>
                <div className="se-stat-info">
                  <span className="se-stat-label">Total Calls</span>
                  <span className="se-stat-number">{totalCalls}</span>
                  <span className="se-stat-note">Users connected with you</span>
                </div>
              </div>

              {/* Total Earning */}
              <div className="se-stat-box">
                <span className="se-stat-icon-wrap green">
                  <FaRupeeSign />
                </span>
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
              <span className="se-section-icon">
                <FaCalendarAlt />
              </span>
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
              <button
                className="se-request-btn"
                onClick={() => alert("Payment requested!")}
              >
                <FaPaperPlane />
                Request Payment
              </button>
            </div>

            <p className="se-payout-note">
              <FaInfoCircle className="se-payout-note-icon" />
              Payout will be transferred to your account within 2-3 business days.
            </p>
          </section>

          {/* Back to dashboard */}
          <button
            className="se-dashboard-btn"
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </button>

        </div>
      </main>
    </div>
  );
}
