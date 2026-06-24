import "./QueuePage.css";
import Header from "../../components/Header.jsx";

import { FiUsers, FiPhone } from "react-icons/fi";
import { BsStars, BsExclamationTriangle, BsInfoCircle } from "react-icons/bs";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
import { TbShieldCheck, TbUsers, TbVideoOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export default function QueuePage() {
  const navigate = useNavigate();

  // TODO(api): position/wait-time/payment summary are still hardcoded below —
  // replace with a live queue session fetched from GET /api/queue/:sessionId
  // and subscribe to position updates via websocket/polling so "#7" and
  // "~18 - 22 min" update in real time, and auto-navigate to /call (or enable
  // "Join Call" only) once it's actually this user's turn.

  // Finds whichever host is currently live so "Join Call" can route the user
  // into that host's real Agora channel. TODO(api): once bookings exist,
  // this should instead resolve to the specific host this user booked.
  const [liveChannel, setLiveChannel] = useState(null);

  useEffect(() => {
    const liveQuery = query(
      collection(db, "liveSessions"),
      where("status", "==", "live"),
      limit(1),
    );

    const unsubscribe = onSnapshot(
      liveQuery,
      (snap) => {
        const liveDoc = snap.docs[0]?.data();
        setLiveChannel(liveDoc?.channelName ?? null);
      },
      (err) => console.error("Failed to look up live session:", err),
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="queue-page">
      <div className="queue-container">

        {/* HEADER */}
        <Header mode="queue" userName="Rohan" />


        <div className="content-grid">

          {/* LEFT SIDE */}
          <div className="main-card">

            <div className="queue-title">
              <div className="icon-circle">
                <FiUsers size={22} />
              </div>

              <div>
                <h3>You're in the queue</h3>
                <p>Please wait, your call will start soon.</p>
              </div>
            </div>

            <div className="queue-status">

              <div className="status-item">
                <p>Your Queue Position</p>
                <h2 className="waiting-yellow">#7</h2>
              </div>

              <div className="divider"></div>

              <div className="status-item">
                <p>Estimated wait time</p>
                <h2>
                  <MdOutlineAccessTime size={20} style={{ verticalAlign: "middle", marginRight: 4 }} />
                  ~18 - 22 min
                </h2>
              </div>

            </div>

            <div className="warning-box">
              <BsExclamationTriangle size={15} style={{ flexShrink: 0, marginTop: 2 }} />
              Any abusive, inappropriate or offensive behaviour during a
              call may result in immediate disconnection by the host.
            </div>

            <div className="bottom-row">

              <div className="info-text">
                <BsInfoCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3>You can leave this page.</h3>
                  <p>We will notify you when it's your turn.</p>
                </div>
              </div>

              <button
                className="join-btn"
                disabled={!liveChannel}
                onClick={() => navigate(`/call?channel=${liveChannel}`)}
                title={liveChannel ? undefined : "Waiting for the host to go live"}
              >
                <FiPhone size={16} />
                {liveChannel ? "Join Call" : "Waiting for host..."}
              </button>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="sidebar">

            <div className="creator-card">

              <div className="avatar-wrapper-queue">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&q=80"
                  alt="Aisha"
                />
                <span className="online"></span>
              </div>

              <h2>
                Aisha <RiVerifiedBadgeFill size={18} style={{ color: "#4f8ef7", verticalAlign: "middle" }} />
              </h2>

              <p>1-on-1 Audio Call</p>

              <div className="details">

                <div>
                  <span>Session Time</span>
                  <strong>90 min</strong>
                </div>

                <div>
                  <span>Purchased Minutes</span>
                  <strong>5 min</strong>
                </div>

                <div>
                  <span>Amount Paid</span>
                  <strong>₹229</strong>
                </div>

              </div>

            </div>

            <div className="rules-card">

              <h3>Instructions / Rules</h3>

              <div className="rule">
                <FiUsers size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>You're in the queue</strong>
                  <p>We will call you in order.</p>
                </div>
              </div>

              <div className="rule">
                <BsStars size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Enjoy your talk</strong>
                  <p>Have a great conversation.</p>
                </div>
              </div>

              <div className="rule">
                <BsExclamationTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Be respectful</strong>
                  <p>Abusive behaviour may result in immediate disconnection.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="features">

          <div className="feature">
            <TbShieldCheck size={22} />
            <div>
              <strong>100% Secure Payments</strong>
              <p>Your payments are safe.</p>
            </div>
          </div>

          <div className="feature">
            <TbUsers size={22} />
            <div>
              <strong>Fair Queue System</strong>
              <p>First come, first served.</p>
            </div>
          </div>

          <div className="feature">
            <TbVideoOff size={22} />
            <div>
              <strong>No Recordings</strong>
              <p>Your calls are private.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}