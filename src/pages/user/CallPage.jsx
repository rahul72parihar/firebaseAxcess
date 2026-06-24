import "./Callpage.css";
import Header from "../../components/Header.jsx";

import { RiVerifiedBadgeFill } from "react-icons/ri";

import { MdSecurity } from "react-icons/md";
import { BsExclamationTriangle } from "react-icons/bs";
import { TbPhoneOff, TbMicrophone, TbVolume } from "react-icons/tb";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { joinVoiceChannel } from "../../services/agora";

export default function Callpage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [showEndCallModal, setShowEndCallModal] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  // const [infoMessage, setInfoMessage] = useState(true);

  // TODO(api): channel comes from the booking/queue match once that backend
  // exists — for now it's read from ?channel=host-<hostUid> (set by whatever
  // links the user here) so a host's LivePage and this page can share a
  // real Agora channel for manual testing.
  const channelName = searchParams.get("channel") || "demo-channel";

  useEffect(() => {
    let handle;
    let cancelled = false;

    joinVoiceChannel({ channelName })
      .then((h) => {
        if (cancelled) {
          h.leave();
          return;
        }
        handle = h;
        callRef.current = h;
      })
      .catch((err) => console.error("Failed to join Agora channel:", err));

    return () => {
      cancelled = true;
      handle?.leave().catch(console.error);
      callRef.current = null;
    };
  }, [channelName]);

  // TODO(api): "Time Left" / "Call Duration" / progress bar are hardcoded
  // — drive from the call's real elapsed/remaining time (server clock or
  // local timer synced with session start time from the API).

  return (
    <div className="call-page">
      <div className="call-container">
        {/* Header */}
        <Header mode="call" setShowEndCallModal={setShowEndCallModal} />

        {/* Hero */}
        <section className="hero-section">
          <div className="hero-left">
            <h2>You're in a call</h2>

            <p>Enjoy your 1-on-1 conversation</p>
          </div>

          <div className="hero-right">
            {/* Info Message */}
            <div className="call-info-banner call-info-banner-mobile">
              <div className="call-info-left">
                <span className="info-icon">i</span>

                <div>
                  <h4>Please don't clear the page or go to background.</h4>
                  <p>Doing so will end the call.</p>
                </div>
              </div>

              {/* <button className="banner-close" onClick={()=>{setInfoMessage(false)}}>✕</button> */}
            </div>

            {/* Existing Timer Card */}
            <div className="timer-card">
              <h3>Time Left</h3>

              <div className="timer-big">02:47</div>

              <p>of 03:00 min</p>

              <div className="progress">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        </section>

            <div className="call-info-banner call-info-banner-desktop">
              <div className="call-info-left">
                <span className="info-icon">i</span>

                <div>
                  <h4>Please don't clear the page or go to background.</h4>
                  <p>Doing so will end the call.</p>
                </div>
              </div>

              {/* <button className="banner-close" onClick={()=>{setInfoMessage(false)}}>✕</button> */}
            </div>
        {/* Avatar Section */}
        <section className="avatar-section">
          <div className="wave wave-left"></div>

          <div className="avatar-wrapper">
            {/* <div className="live-badge">
              <span className="live-dot" />
              LIVE
            </div> */}
            <div className="avatar-ring">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80"
                alt="Aisha"
                className="avatar-img"
                id="avatarImg"
              />
            </div>

            <h3>
              Aisha
              <RiVerifiedBadgeFill
                size={22}
                className="verified"
                style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
              />
            </h3>

            <p>8.7K followers</p>
          </div>

          <div className="wave wave-right"></div>
        </section>

        {/* Controls */}
        <section className="controls">
          <div className="control">
            <button
              className={`circle-btn ${isMuted ? "active-control" : ""}`}
              onClick={async () => {
                const muted = await callRef.current?.toggleMuted();
                setIsMuted(muted ?? !isMuted);
              }}
            >
              <TbMicrophone size={26} />
            </button>

            <span>{isMuted ? "Muted" : "Mute"}</span>
          </div>

          <button
            className="circle-btn end"
            onClick={() => setShowEndCallModal(true)}
          >
            <TbPhoneOff size={26} />
          </button>

          <div className="control">
            <button
              className={`circle-btn ${isSpeakerOn ? "active-control" : ""}`}
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              <TbVolume size={26} />
            </button>

            <span>{isSpeakerOn ? "Speaker On" : "Speaker"}</span>
          </div>
        </section>

        {/* Warning */}
        <div className="warning-card">
          <BsExclamationTriangle
            size={16}
            style={{ flexShrink: 0, marginTop: 2 }}
          />
          Any abusive, inappropriate, or offensive behavior during a call may
          result in immediate disconnection by the host. No refund will be
          provided.
        </div>

        {/* Stats */}
        <div className="stats-card">
          <div className="stat">
            <p>Call Duration</p>
            <h3>00:13 min</h3>
          </div>

          <div className="stat-divider"></div>

          <div className="stat">
            <p>Time Left</p>
            <h3>02:47 min</h3>
          </div>
        </div>

        <div className="secure-footer">
          <MdSecurity size={16} />
          100% private and secure
        </div>
      </div>

      {/* MODAL */}

      {showEndCallModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>End Call?</h3>

            <p>
              Are you sure you want to end this call? Once ended, you cannot
              rejoin the current session.
            </p>

            <div className="modal-actions">
              <button
                className="modal-btn cancel"
                onClick={() => setShowEndCallModal(false)}
              >
                Continue Call
              </button>

              {/* TODO(api): call POST /api/calls/:id/end before navigating away
                  so the backend can finalize duration/billing for this call. */}
              <button
                className="modal-btn confirm"
                onClick={async () => {
                  await callRef.current?.leave();
                  callRef.current = null;
                  navigate("/");
                }}
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
