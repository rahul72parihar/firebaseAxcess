import "./Home.css";
import { useState } from "react";
import AuthModal from "../../components/AuthModal.jsx";
import Header from "../../components/Header.jsx";

import girlImg from "../../assets/girl.png";
import instaIcon from "../../assets/Instagram_icon.png";

import { TbLock } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import { TbBellRinging } from "react-icons/tb";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// TODO(api): fetch from GET /api/plans — pricing/minute tiers shown on the homepage
const plans = [
  { mins: 3, price: 149 },
  { mins: 5, price: 229, popular: true },
  { mins: 10, price: 399 },
];

export default function Home() {
  const navigate = useNavigate();

  const [authOpen, setAuthOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);

  // TODO(api): fetch current host profile from GET /api/hosts/:id (or /api/hosts/featured)
  // — replace hardcoded "Aisha", follower count, avatar image, and LIVE status below.

  // TODO(api): fetch from GET /api/hosts/:id/availability to drive minutes-left,
  // total session length, and the booked/remaining progress bar in the "Minutes" card.

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
        <div className="hero-wrap">
          <section className="hero-banner">
            <div className="hero-bg">
              <img src={girlImg} alt="Aisha" className="hero-bg-img" />
              <div className="hero-overlay" />
            </div>

            <div className="hero-top-row">
              <div className="live-badge">
                <span className="live-dot" />
                LIVE NOW
              </div>
            </div>

            <div className="hero-text">
              <h1>
                Talk 1-on-1
              </h1>

              {/* <p className="hero-location">20 • India</p> */}

              <p className="hero-bio">
                Real conversations. No DMs.{" "}
                <IoHeart size={16} style={{ verticalAlign: "middle", color: "#c4b5fd" }} />
              </p>
            </div>

            <div className="hero-insta-badge">
              <img
                src={instaIcon}
                alt="Instagram Icon"
                className="insta-icon-homepage"
              />
              <span>Aisha, 20</span>
              <RiVerifiedBadgeFill className="verified" />
            </div>
          </section>

          {/* Overlapping stat card */}
          <div className="hero-stat-card">
            {/* Section 1: call info + minutes-left badge */}
            <div className="hero-stat-section hero-stat-section-top">
              <div className="hero-stat-left">
                <span className="hero-stat-icon">
                  <FiPhone size={18} />
                </span>
                <div>
                  <strong>1-on-1 Audio Call</strong>
                  <span>90 min Session</span>
                </div>
              </div>

              <div className="hero-stat-badge">
                <strong>36 min left</strong>
                <span>of 90 min</span>
              </div>
            </div>

            <div className="hero-stat-divider" />

            {/* Section 2: progress + booked/remaining */}
            <div className="hero-stat-section hero-stat-section-bottom">
              <div className="progress hero-progress">
                <div className="progress-fill"></div>
              </div>

              <div className="hero-progress-labels">
                <span>54 min already booked</span>
                <span className="hero-progress-divider" />
                <span>Limited slot available</span>
              </div>
            </div>
          </div>
        </div>

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
        />

        {/* Minutes */}
        {/* <section className="card minutes-card">
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
        </section> */}

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
                }
                ${
                  plan.popular ? "popular-plan-card" : ""
                }
                `}
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

          {/* TODO(api): wire to payment gateway (e.g. POST /api/payments/create-order),
              then on success call POST /api/queue/join before navigating to /queue. */}
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
