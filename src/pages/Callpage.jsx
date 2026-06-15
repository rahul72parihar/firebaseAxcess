import "./Callpage.css";
import musicImg from "../assets/musicicon.png";
import { RiH3, RiVerifiedBadgeFill } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import { BsExclamationTriangle } from "react-icons/bs";
import {
  TbPhone,
  TbPhoneOff,
  TbMicrophone,
  TbVolume,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Callpage() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  return (
    <div className="call-page">
      <div className="call-container">

        {/* Header */}
        <header className="call-header">
          <div className="logo">
            <img src={musicImg} alt="Axcess" className="logo-icon" />
            Axcess
          </div>

          <button className="top-end-btn"
          onClick={()=>{
            navigate("/")
          }}>
            <TbPhoneOff size={18} />
            End Call
          </button>
        </header>

        {/* Hero */}
        <section className="hero-section">

          <div className="hero-left">
            <div className="live-badge">
              <span className="live-dot" />
              LIVE
            </div>

            <h2>You're in a call</h2>

            <p>Enjoy your 1-on-1 conversation</p>
          </div>

          <div className="timer-card">
            <h3>Time Left</h3>

            <div className="timer-big">02:47</div>

            <p>of 03:00 min</p>

            <div className="progress">
              <div className="progress-fill"></div>
            </div>
          </div>

        </section>

        {/* Avatar Section */}
        <section className="avatar-section">

          <div className="wave wave-left"></div>

          <div className="avatar-wrapper">

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
              <RiVerifiedBadgeFill size={20} className="verified" />
            </h3>

            <p>8.7K followers</p>

          </div>

          <div className="wave wave-right"></div>

        </section>

        {/* Controls */}
        <section className="controls">

          <div className="control">
  <button
    className={`circle-btn ${
      isMuted ? "active-control" : ""
    }`}
    onClick={() => setIsMuted(!isMuted)}
  >
    <TbMicrophone size={26} />
  </button>

  <span>
    {isMuted ? "Muted" : "Mute"}
  </span>
</div>

          <div className="control">
            <button className="circle-btn end"
            onClick={()=>navigate("/")}>
              <TbPhoneOff size={26} />
            </button>
            <span>End Call</span>
          </div>

          <div className="control">
  <button
    className={`circle-btn ${
      isSpeakerOn ? "active-control" : ""
    }`}
    onClick={() =>
      setIsSpeakerOn(!isSpeakerOn)
    }
  >
    <TbVolume size={26} />
  </button>

  <span>
    {isSpeakerOn
      ? "Speaker On"
      : "Speaker"}
  </span>
</div>

        </section>

        {/* Warning */}
        <div className="warning-card">
          <BsExclamationTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
          Any abusive, inappropriate, or offensive behavior during a call
          may result in immediate disconnection by the host. No refund will
          be provided.
        </div>

        {/* Stats */}
        <div className="stats-card">

          <div className="stat">
            <p>Call Duration</p>
            <h3>00:13 min</h3>
          </div>

          <div className="divider"></div>

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
    </div>
  );
}