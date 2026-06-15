import "./Home.css";
import { useEffect, useState } from "react";
import AuthModal from "../components/AuthModal.jsx";

import girlImg from "../assets/girl.png";
import musicImg from "../assets/musicicon.png";

import {
  TbShieldLock,
  TbUser,
  TbLock,
  TbUsersGroup,
  TbClockHour4,
} from "react-icons/tb";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const plans = [
  { mins: 3, price: 149 },
  { mins: 5, price: 229, popular: true },
  { mins: 10, price: 399 },
];

export default function Home() {
  const navigate = useNavigate();

  const [authOpen, setAuthOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);

  useEffect(() => {
    const raw = sessionStorage.getItem("axcess_auth");

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setLoggedIn(Boolean(parsed?.uid));
    } catch {
      console.error("Invalid auth data");
    }
  }, []);

  return (
    <div className="ax-page">
      <div className="container">
        {/* Navbar */}
        <header className="navbar">
          <div className="logo">
            <img src={musicImg} alt="Axcess" className="logo-icon" />
            <span>Axcess</span>
          </div>

          <div className="nav-right">
            <div className="secure">
              <TbShieldLock size={18} />
              Secure Payment
            </div>

            {loggedIn ? (
              <button
                className="login-btn"
                onClick={() => {
                  sessionStorage.removeItem("axcess_auth");
                  setLoggedIn(false);
                }}
              >
                <TbUser size={18} />
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={() => setAuthOpen(true)}>
                <TbUser size={18} />
                Login / Signup
              </button>
            )}
          </div>
        </header>

        {/* Hero */}
        <section className="hero-card">
          <div className="hero-content">
            <div className="live-badge">
              <span className="live-dot" />
              LIVE NOW
            </div>

            <h1>
              Talk 1-on-1
              <br />
              with <span>Aisha</span>{" "}
              <IoHeart
                size={28}
                style={{
                  verticalAlign: "middle",
                  color: "#7c3aed",
                }}
              />
            </h1>

            <p>Real conversations. No DMs.</p>

            <div className="hero-meta">
              <div>
                <strong>90 min</strong>
                <span>Session</span>
              </div>

              <div>
                <strong>Audio Call</strong>
                <span>1-on-1</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrap">
            <div className="profile-card">
              <h3>
                Aisha, 20
                <RiVerifiedBadgeFill
                  className="verified"
                  style={{ marginLeft: 6 }}
                />
              </h3>

              <p>8.7K followers</p>
            </div>

            <img src={girlImg} alt="Aisha" className="hero-image" />
          </div>
        </section>

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onLoggedIn={() => setLoggedIn(true)}
        />

        {/* Minutes */}
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

        {/* Pricing */}
        <section className="card">
          <h2>Choose your minutes</h2>

          <div className="plans">
            {plans.map((plan) => (
              <div
                key={plan.mins}
                onClick={() => setSelectedPlan(plan)}
                className={`plan ${
                  selectedPlan.mins === plan.mins ? "active" : ""
                }`}
              >
                {plan.popular && <div className="popular">Most Popular</div>}

                <h3>{plan.mins}</h3>
                <p>Minutes</p>

                <h4>₹{plan.price}</h4>

                <div
                  className={`radio ${
                    selectedPlan.mins === plan.mins ? "radio-active" : ""
                  }`}
                />
              </div>
            ))}
          </div>

          <button className="pay-btn" onClick={() => navigate("/queue")}>
            Pay ₹{selectedPlan.price} & Join Queue
          </button>

          <div className="payment-note">
            <TbLock size={18} />
            Secure & Encrypted Payments
          </div>

          {/* Queue */}
          <div className="queue-card">
            <div className="queue-item">
              <TbUsersGroup className="queue-icon" />

              <div>
                <strong>18 people in queue</strong>
                <p>We will call you in order</p>
              </div>
            </div>

            <div className="queue-divider" />

            <div className="queue-item">
              <TbClockHour4 className="queue-icon" />

              <div>
                <strong>~15 min</strong>
                <p>Estimated wait</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
