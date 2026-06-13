import "./Callpage.css";

export default function Callpage() {
  return (
    <div className="call-page">
      <div className="call-container">

        {/* Header */}
        <header className="call-header">
          <div className="logo">
            Axcess <span>🎵</span>
          </div>

          <button className="top-end-btn">
            📞 End Call
          </button>
        </header>

        {/* Hero */}
        <section className="hero-section">

          <div className="hero-left">
            <div className="live-badge">
              🔴 LIVE
            </div>

            <h1>You're in a call</h1>

            <p>
              Enjoy your 1-on-1 conversation
            </p>
          </div>

          <div className="timer-card">
            <h3>Time Left</h3>

            <div className="timer-big">
              02:47
            </div>

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
              />
            </div>

            <h2>
              Aisha
              <span className="verified">✓</span>
            </h2>

            <p>8.7K followers</p>

          </div>

          <div className="wave wave-right"></div>

        </section>

        {/* Controls */}
        <section className="controls">

          <div className="control">
            <button className="circle-btn">
              🎤
            </button>
            <span>Mute</span>
          </div>

          <div className="control">
            <button className="circle-btn end">
              📞
            </button>
            <span>End Call</span>
          </div>

          <div className="control">
            <button className="circle-btn">
              🔊
            </button>
            <span>Speaker</span>
          </div>

        </section>

        {/* Warning */}
        <div className="warning-card">
          ⚠️ Any abusive, inappropriate, or offensive
          behavior during a call may result in immediate
          disconnection by the host. No refund will be
          provided.
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
          🔒 100% private and secure
        </div>

      </div>
    </div>
  );
}