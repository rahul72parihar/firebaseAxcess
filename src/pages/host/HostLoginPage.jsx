import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";

import { cleanupOtpSession, sendOtp, verifyOtp } from "../../auth/firebaseOtp";
import { loginSuccess } from "../../store/authSlice";

import musicImg from "../../assets/musicicon.png";
import { FaBroadcastTower, FaShieldAlt } from "react-icons/fa";

import "./HostLoginPage.css";

export default function HostLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const recaptchaContainerRef = useRef(null);
  const verifierRef = useRef(null);

  useEffect(() => {
    if (!recaptchaContainerRef.current) return;

    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        size: "invisible",
      });
    }

    return () => {
      if (verifierRef.current) {
        verifierRef.current.clear();
        verifierRef.current = null;
      }

      cleanupOtpSession();
    };
  }, []);

  const nationalNumber = phoneNumber.startsWith("+91")
    ? phoneNumber.slice(3)
    : phoneNumber.replace(/^\+/, "");

  const canSendOtp = useMemo(() => {
    const cleaned = phoneNumber.replace(/\s+/g, "");
    return cleaned.startsWith("+") && cleaned.length >= 8;
  }, [phoneNumber]);

  async function handleSendOtp(e) {
    e?.preventDefault();
    setError("");

    const cleaned = phoneNumber.replace(/\s+/g, "");

    if (!cleaned.startsWith("+") || cleaned.length < 8) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        size: "invisible",
      });
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

      // TODO(api): once a backend session exists, fetch/create the host profile
      // here (e.g. POST /api/auth/session with role "host") and pass real
      // profile fields into loginSuccess instead of just { uid, phone, role }.
      dispatch(loginSuccess({ uid, phone, role: "host" }));

      navigate("/host/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Invalid OTP");
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

        <h1 className="hl-title">
          {step === "phone" ? "Login to your host account" : "Verify your number"}
        </h1>
        <p className="hl-subtitle">
          {step === "phone"
            ? "Enter your phone number to receive a one-time password."
            : `We've sent a code to ${phoneNumber}`}
        </p>

        {step === "phone" ? (
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
        )}

        <p className="hl-secure-note">
          <FaShieldAlt />
          Secure host-only access
        </p>
      </div>
    </div>
  );
}
