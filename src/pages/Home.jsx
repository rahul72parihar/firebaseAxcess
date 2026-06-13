import "./Home.css";
import { useEffect, useState } from "react";
import AuthModal from "../components/AuthModal.jsx";

import girlImg from "../assets/girl.png";
import musicImg from "../assets/musicicon.png";


const plans = [
  { mins: 3, price: 149, popular: true },
  { mins: 5, price: 229 },
  { mins: 10, price: 399 },
];

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const raw = sessionStorage.getItem("axcess_auth");
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        setLoggedIn(Boolean(parsed?.uid));
      } catch {
        // ignore
      }
    });
  }, []);


  return (

    <div className="ax-page">
      <div className="container">
        <header className="navbar">
          <div className="logo">
            Axcess <img src={musicImg} alt="Music Icon" className="logoIcon" aria-hidden="true" />
          </div>

          <div className="nav-right">
            <div className="secure">🛡️ Secure Payment</div>
            {loggedIn ? (
              <button
                className="login-btn"
                onClick={() => {
                  sessionStorage.removeItem("axcess_auth");
                  setLoggedIn(false);
                }}
              >
                👤 Logout
              </button>
            ) : (
              <button className="login-btn" onClick={() => setAuthOpen(true)}>
                👤 Login / Signup
              </button>
            )}


          </div>
        </header>

        <section className="hero-card">
          <div className="hero-content">
            <div className="live-badge">🔴 LIVE NOW</div>
            <h1>Talk 1-on-1<br/>with <span>Aisha</span> 💜</h1>
            <p>Real conversations. No DMs.</p>

            <div className="hero-meta">
              <div><strong>90 min</strong><span>Session</span></div>
              <div><strong>Audio Call</strong><span>1-on-1</span></div>
            </div>
          </div>

          <div className="hero-image-wrap">
            <div className="profile-card">
              <h3>Aisha, 20 ✓</h3>
              <p>📸 8.7K followers</p>
            </div>
            <img
              src={girlImg}
              alt="Aisha"
              className="hero-image"
            />
          </div>
        </section>

        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLoggedIn={() => setLoggedIn(true)} />

        <section className="card minutes-card">

          <div>
            <h2>Minutes Available</h2>
            <div className="minutes-row">
              <div className="big-number">36</div>
              <div>
                <div className="min-left">min left</div>
                <div>of 90 min</div>
              </div>
            </div>
          </div>

          <div>
            <div className="session">Total Session: 90 min</div>
            <div className="progress">
              <div className="progress-fill"></div>
            </div>
            <div className="progress-labels">
              <span>54 min already booked</span>
              <span>36 min remaining</span>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Choose your minutes</h2>

          <div className="plans">
            {plans.map((plan) => (
              <div className={`plan ${plan.popular ? "active" : ""}`} key={plan.mins}>
                {plan.popular && <div className="popular">Most Popular</div>}
                <h3>{plan.mins}</h3>
                <p>Minutes</p>
                <h4>₹{plan.price}</h4>
                <div className="radio"></div>
              </div>
            ))}
          </div>

          <button className="pay-btn">
            Pay ₹149 & Join Queue →
          </button>

          <div className="payment-note">
            🔒 Secure & Encrypted Payments
          </div>

          <div className="queue-card">
            <div>
              <strong>18 people in queue</strong>
              <p>We will call you in order</p>
            </div>
            <div>
              <strong>~15 min</strong>
              <p>Estimated wait</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
