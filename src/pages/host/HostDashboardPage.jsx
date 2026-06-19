import { useNavigate } from "react-router-dom";
import {
  FaUserFriends,
  FaPhone,
  FaClock,
  FaRupeeSign,
  FaBroadcastTower,
  FaBell,
  FaShieldAlt,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";
import Header from "../../components/Header.jsx";
import "./HostDashboardPage.css";

const STATS = [
  { icon: FaUserFriends, color: "purple", value: "18", label: "Total Booked" },
  { icon: FaPhone, color: "green", value: "128", label: "Total Calls" },
  { icon: FaClock, color: "orange", value: "32.4 hrs", label: "Total Live Time" },
  { icon: FaRupeeSign, color: "purple", value: "₹8,420", label: "Total Earnings" },
];

const TIPS = [
  {
    icon: FaUserFriends,
    color: "purple",
    title: "Share your session link",
    desc: "Invite more people to increase your bookings.",
  },
  {
    icon: FaBell,
    color: "green",
    title: "Users are notified",
    desc: "We'll alert users before their turn in the session.",
  },
  {
    icon: FaShieldAlt,
    color: "amber",
    title: "You're in control",
    desc: "You can manage your session and calls easily while live.",
  },
];

export default function HostDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="hd-page">
      <Header mode="create" />

      <main className="hd-main">
        <div className="hd-content">

          <div className="hd-welcome">
            <h1 className="hd-title">Welcome back, Rohan! 👋</h1>
            <p className="hd-subtitle">Go live, connect and grow with your audience.</p>
          </div>

          {/* Stats */}
          <section className="hd-card hd-stats-card">
            <div className="hd-stats-grid">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div className="hd-stat" key={s.label}>
                    {i > 0 && <span className="hd-stat-divider" />}
                    <span className={`hd-stat-icon-wrap ${s.color}`}>
                      <Icon />
                    </span>
                    <span className="hd-stat-value">{s.value}</span>
                    <span className="hd-stat-label">{s.label}</span>
                    <span className="hd-stat-sub">All time</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Go live */}
          <section className="hd-golive-card">
            <div className="hd-golive-left">
              <span className="hd-golive-icon-wrap">
                <FaBroadcastTower />
              </span>
              <div>
                <h2 className="hd-golive-title">Ready to go live?</h2>
                <p className="hd-golive-desc">
                  Start your session and connect with your users one by one.
                </p>
              </div>
            </div>
            <div className="hd-golive-right">
              <button className="hd-golive-btn" onClick={() => navigate("/host/session")}>
                <FaBroadcastTower />
                Go Live Now
              </button>
              <p className="hd-golive-note">
                <FaClock />
                You can go live at your selected time
              </p>
            </div>
          </section>

          {/* Quick tips */}
          <section className="hd-card">
            <h2 className="hd-section-title">Quick Tips</h2>
            <div className="hd-tips-list">
              {TIPS.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div className="hd-tip-row" key={tip.title}>
                    <span className={`hd-tip-icon-wrap ${tip.color}`}>
                      <Icon />
                    </span>
                    <div className="hd-tip-body">
                      <span className="hd-tip-title">{tip.title}</span>
                      <span className="hd-tip-desc">{tip.desc}</span>
                    </div>
                    <FaChevronRight className="hd-tip-arrow" />
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      {/* Bottom nav */}
      <footer className="hd-bottom-nav">
        <button className="hd-nav-item active">
          <FaHome />
          Home
        </button>
        <button className="hd-nav-item">
          <FaRupeeSign />
          Earnings
        </button>
      </footer>
    </div>
  );
}
