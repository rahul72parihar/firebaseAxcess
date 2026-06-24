import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { FiPhone, FiUsers } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import Header from "../../components/Header.jsx";
import { db } from "../../firebase";
import "./QueuePage.css";

// Public landing page for a host's shared session link
// (e.g. axcess.live/join/<hostUid>). Waits for liveSessions/{hostUid} to
// flip to "live" and lets the user jump straight into the real Agora call.
export default function JoinSessionPage() {
  const { hostUid } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(Boolean(hostUid));

  useEffect(() => {
    if (!hostUid) return;

    const unsubscribe = onSnapshot(
      doc(db, "liveSessions", hostUid),
      (snap) => {
        setSession(snap.exists() ? snap.data() : null);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to look up session:", err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [hostUid]);

  const isLive = session?.status === "live";

  return (
    <div className="queue-page">
      <div className="queue-container">
        <Header mode="queue" />

        <div className="content-grid">
          <div className="main-card">
            <div className="queue-title">
              <div className="icon-circle">
                <FiUsers size={22} />
              </div>
              <div>
                <h3>{isLive ? "The host is live!" : "Waiting for the host"}</h3>
                <p>
                  {isLive
                    ? "Join now to connect with the host."
                    : loading
                      ? "Checking session status..."
                      : "You'll be able to join as soon as the host goes live."}
                </p>
              </div>
            </div>

            {!isLive && (
              <div className="queue-status">
                <div className="status-item">
                  <p>Status</p>
                  <h2>
                    <MdOutlineAccessTime size={20} style={{ verticalAlign: "middle", marginRight: 4 }} />
                    Not live yet
                  </h2>
                </div>
              </div>
            )}

            <div className="bottom-row">
              <div className="info-text" />
              <button
                className="join-btn"
                disabled={!isLive}
                onClick={() => navigate(`/call?channel=${session.channelName}`)}
              >
                <FiPhone size={16} />
                {isLive ? "Join Call" : "Waiting for host..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
