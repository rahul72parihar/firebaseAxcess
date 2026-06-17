import "./Home.css";
import { useState } from "react";
import AuthModal from "../../components/AuthModal.jsx";
import Header from "../../components/Header.jsx";

import girlImg from "../../assets/girl.png";
import instaIcon from "../../assets/Instagram_icon.png";

import { TbLock } from "react-icons/tb";
import { FiClock } from "react-icons/fi";
import { TbBellRinging } from "react-icons/tb";

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
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);

  return (
    <div className="ax-page">
      <div className="container">
        {/* Navbar */}
        <Header
          mode="default"
          showAuthButtons={true}
          onLogin={() => setAuthOpen(true)}
        />

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
            <img src={girlImg} alt="Aisha" className="hero-image" />

            <div className="profile-card">
              <h3>
                <img
                  src={instaIcon}
                  alt="Instagram Icon"
                  className="insta-icon-homepage"
                />
                Aisha, 20
                <RiVerifiedBadgeFill
                  className="verified"
                  style={{ marginLeft: 6 }}
                />
              </h3>

              <p>8.7K followers</p>
            </div>
          </div>
        </section>

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
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
            <div className="limited-slots-badge">
              <FiClock size={10} />
              <span>Limited slots available! Hurry up!</span>
            </div>
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

                <h3>
                  {plan.mins} <span className="small-minutes">minutes</span>
                </h3>

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
          <div className="turn-notification">
            <TbBellRinging className="turn-notification-icon" />
            <span>Join the queue now. We'll notify you before it's your turn to connect.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
