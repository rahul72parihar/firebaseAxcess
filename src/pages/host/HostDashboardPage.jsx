import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
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
import { db, auth } from "../../firebase";
import "./HostDashboardPage.css";

const STAT_DEFS = [
  { key: "totalBooked", icon: FaUserFriends, color: "purple", label: "Total Booked", format: (v) => `${v ?? 0}` },
  { key: "totalCalls", icon: FaPhone, color: "green", label: "Total Calls", format: (v) => `${v ?? 0}` },
  {
    key: "totalLiveMinutes",
    icon: FaClock,
    color: "orange",
    label: "Total Live Time",
    format: (v) => `${((v ?? 0) / 60).toFixed(1)} hrs`,
  },
  {
    key: "totalEarnings",
    icon: FaRupeeSign,
    color: "purple",
    label: "Total Earnings",
    format: (v) => `₹${(v ?? 0).toLocaleString("en-IN")}`,
  },
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

const EMPTY_STATS = {
  totalBooked: 0,
  totalCalls: 0,
  totalLiveMinutes: 0,
  totalEarnings: 0,
};

export default function HostDashboardPage() {
  const navigate = useNavigate();
  const uid = useSelector((s) => s.auth.uid);

  const [hostData, setHostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const hostRef = doc(db, "hosts", uid);

    const unsubscribe = onSnapshot(
      hostRef,
      (snap) => {
        if (snap.exists()) {
          setHostData(snap.data());
        } else {
          const fallbackName = auth.currentUser?.displayName || "Host";
          const initialDoc = { name: fallbackName, ...EMPTY_STATS };
          setDoc(hostRef, initialDoc, { merge: true }).catch(console.error);
          setHostData(initialDoc);
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [uid]);

  const stats = hostData ?? EMPTY_STATS;
  const hostName = hostData?.name || auth.currentUser?.displayName || "Host";

  return (
    <div className="hd-page">
      <Header mode="create" />

      <main className="hd-main">
        <div className="hd-content">

          <div className="hd-welcome">
            <h1 className="hd-title">Welcome back, {hostName}! 👋</h1>
            <p className="hd-subtitle">Go live, connect and grow with your audience.</p>
          </div>

          {/* Stats */}
          <section className="hd-card hd-stats-card">
            <div className="hd-stats-grid">
              {STAT_DEFS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div className="hd-stat" key={s.key}>
                    {i > 0 && <span className="hd-stat-divider" />}
                    <span className={`hd-stat-icon-wrap ${s.color}`}>
                      <Icon />
                    </span>
                    <span className="hd-stat-value">
                      {loading ? "…" : s.format(stats[s.key])}
                    </span>
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
