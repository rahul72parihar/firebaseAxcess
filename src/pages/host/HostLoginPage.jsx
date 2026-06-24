import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase";

import { sendOtp, verifyOtp } from "../../auth/firebaseOtp";

import { loginSuccess } from "../../store/authSlice";

import musicImg from "../../assets/musicicon.png";
import { FaBroadcastTower, FaShieldAlt } from "react-icons/fa";

import "./HostLoginPage.css";

import { signInWithEmailPassword } from "../../auth/firebaseEmailPassword";

export default function HostLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [method, setMethod] = useState("phone");

  // phone OTP (existing)
  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const recaptchaContainerRef = useRef(null);
  const verifierRef = useRef(null);

  // email/password (new)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nationalNumber = phoneNumber.startsWith("+91")
    ? phoneNumber.slice(3)
    : phoneNumber.replace(/^\+/, "");

  const canSendOtp = useMemo(() => {
    const cleaned = phoneNumber.replace(/\s+/g, "");
    return cleaned.startsWith("+") && cleaned.length >= 8;
  }, [phoneNumber]);

  // Initialize recaptcha verifier
  useMemo(() => {
    // kept as a no-op to preserve structure; Recaptcha verifier is created lazily.
    return null;
  }, []);

  async function handleSendOtp(e) {
    e?.preventDefault();
    setError("");

    const cleaned = phoneNumber.replace(/\s+/g, "");

    if (!cleaned.startsWith("+") || cleaned.length < 8) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(
        auth,
        recaptchaContainerRef.current,
        { size: "invisible" },
      );
      await verifierRef.current.render();
    }

    try {
      setLoading(true);
      await sendOtp({ phoneNumber: cleaned, appVerifier: verifierRef.current });
      setStep("otp");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e) {
    e?.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await verifyOtp(otp.trim());
      const user = res?.user;
      const uid = user?.uid;
      const phone = user?.phoneNumber || phoneNumber;

      sessionStorage.setItem(
        "axcess_auth",
        JSON.stringify({ uid, phone, role: "host", signedInAt: Date.now() }),
      );

      dispatch(loginSuccess({ uid, phone, role: "host" }));
      navigate("/host/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailLogin(e) {
    e?.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await signInWithEmailPassword({
        email: email.trim(),
        password,
      });

      const uid = res?.user?.uid;

      sessionStorage.setItem(
        "axcess_auth",
        JSON.stringify({ uid, phone: null, role: "host", signedInAt: Date.now() }),
      );

      dispatch(loginSuccess({ uid, phone: null, role: "host" }));
      navigate("/host/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Email login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hl-page">
      <div className="hl-card">
        <div className="hl-logo">
          <img src={musicImg} alt="Axcess" className="hl-logo-icon" />
          <span className="hl-logo-text">Axcess</span>
        </div>

        <div className="hl-badge">
          <FaBroadcastTower />
          Host Login
        </div>

        <div className="hl-method-toggle">
          <button
            type="button"
            className={method === "phone" ? "hl-method-btn active" : "hl-method-btn"}
            onClick={() => {
              setMethod("phone");
              setStep("phone");
              setError("");
            }}
            disabled={loading}
          >
            Phone OTP
          </button>
          <button
            type="button"
            className={method === "email" ? "hl-method-btn active" : "hl-method-btn"}
            onClick={() => {
              setMethod("email");
              setError("");
            }}
            disabled={loading}
          >
            Email & Password
          </button>
        </div>

        <h1 className="hl-title">
          {method === "phone"
            ? step === "phone"
              ? "Login to your host account"
              : "Verify your number"
            : "Log in to your account"}
        </h1>
        <p className="hl-subtitle">
          {method === "phone"
            ? step === "phone"
              ? "Enter your phone number to receive a one-time password."
              : `We've sent a code to ${phoneNumber}`
            : "Enter your email and password."}
        </p>

        {method === "phone" ? (
          step === "phone" ? (
            <form className="hl-form" onSubmit={handleSendOtp}>
              <div className="hl-field">
                <label>Phone Number</label>
                <div className="hl-phone-group">
                  <span className="hl-phone-prefix">+91</span>
                  <input
                    value={nationalNumber}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(`+91${digitsOnly}`);
                    }}
                    placeholder="9876543210"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                  />
                </div>
              </div>

              <div ref={recaptchaContainerRef} className="hl-recaptcha" />

              {error && <div className="hl-error">{error}</div>}

              <button className="hl-primary-btn" type="submit" disabled={!canSendOtp || loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form className="hl-form" onSubmit={handleVerify}>
              <div className="hl-field">
                <label>Enter OTP</label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                />
              </div>

              {error && <div className="hl-error">{error}</div>}

              <button
                className="hl-primary-btn"
                type="submit"
                disabled={loading || otp.trim().length < 4}
              >
                {loading ? "Verifying..." : "Login"}
              </button>

              <button
                className="hl-secondary-btn"
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError("");
                }}
                disabled={loading}
              >
                Change Phone Number
              </button>
            </form>
          )
        ) : (
          <form className="hl-form" onSubmit={handleEmailLogin}>
            <div className="hl-field">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />
            </div>

            <div className="hl-field">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
              />
            </div>

            {error && <div className="hl-error">{error}</div>}

            <button
              className="hl-primary-btn"
              type="submit"
              disabled={loading || !email.trim() || !password}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              className="hl-secondary-btn"
              type="button"
              onClick={() => {
                setMethod("phone");
                setError("");
              }}
              disabled={loading}
            >
              Use Phone OTP
            </button>
          </form>
        )}

        <p className="hl-secure-note">
          <FaShieldAlt />
          Secure host-only access
        </p>
      </div>
    </div>
  );
}

