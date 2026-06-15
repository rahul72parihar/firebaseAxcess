import { useEffect, useMemo, useRef, useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";

import "./AuthModal.css";
import { cleanupOtpSession, sendOtp, verifyOtp } from "../auth/firebaseOtp";

export default function AuthModal({ open, onClose, onLoggedIn }) {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("phone");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [locked, setLocked] = useState(false);

  const recaptchaContainerRef = useRef(null);
  const verifierRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    if (!recaptchaContainerRef.current) return;

    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(
        auth,
        recaptchaContainerRef.current,
        {
          size: "invisible",
        },
      );
    }

    return () => {
      if (verifierRef.current) {
        verifierRef.current.clear();
        verifierRef.current = null;
      }

      cleanupOtpSession();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    queueMicrotask(() => {
      setStep("phone");
      setPhoneNumber("");
      setOtp("");
      setError("");
      setSuccessMsg("");
      setLoading(false);
      setAgreeTerms(false);
      setLocked(false); // add this
    });
  }, [open]);

  const canSendOtp = useMemo(() => {
    const cleaned = phoneNumber.replace(/\s+/g, "");

    return cleaned.startsWith("+") && cleaned.length >= 8;
  }, [phoneNumber]);

  async function handleSendOtp(e) {
    e?.preventDefault();

    setError("");
    setSuccessMsg("");

    const cleaned = phoneNumber.replace(/\s+/g, "");

    if (!cleaned.startsWith("+")) {
      setError(
        "Enter phone number in international format (e.g. +14155552671)",
      );
      return;
    }

    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(
        auth,
        recaptchaContainerRef.current,
        {
          size: "invisible",
        },
      );

      await verifierRef.current.render();
    }

    try {
      setLoading(true);

      await sendOtp({
        phoneNumber: cleaned,
        appVerifier: verifierRef.current,
      });

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
    setSuccessMsg("");

    try {
      setLoading(true);

      const res = await verifyOtp(otp.trim());

      const user = res?.user;

      sessionStorage.setItem(
        "axcess_auth",
        JSON.stringify({
          uid: user?.uid,
          phone: user?.phoneNumber || phoneNumber,
          signedInAt: Date.now(),
        }),
      );

      setSuccessMsg("Logged in successfully");

      onLoggedIn?.();
      onClose?.();
    } catch (err) {
      console.error(err);

      setError(err?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="auth-modal-overlay" role="dialog" aria-modal="true">
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <div className="auth-modal-title">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </div>

          <button className="auth-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {step === "phone" ? (
          <form className="auth-form" onSubmit={handleSendOtp}>
            <div className="field">
              <label>Phone Number</label>

              <input
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);

                  if (e.target.value.trim().length > 0) {
                    setLocked(true);
                  }
                }}
                placeholder="+14155552671"
                inputMode="tel"
                autoComplete="tel"
              />

              <div className="hint">We'll send a one-time password (OTP).</div>
            </div>

            {mode === "signup" && (
              <label className="terms-check">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />

                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>
            )}

            <div ref={recaptchaContainerRef} className="recaptcha" />

            {error && <div className="error">{error}</div>}

            {successMsg && <div className="success">{successMsg}</div>}

            <button
              className="primary"
              type="submit"
              disabled={
                !canSendOtp || loading || (mode === "signup" && !agreeTerms)
              }
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleVerify}>
            <div className="field">
              <label>Enter OTP</label>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                inputMode="numeric"
                autoComplete="one-time-code"
              />

              <div className="hint">OTP sent to {phoneNumber}</div>
            </div>

            {error && <div className="error">{error}</div>}

            <button
              className="primary"
              type="submit"
              onClick={() => setLocked(true)}
              disabled={loading || otp.trim().length < 4}
            >
              {loading
                ? "Verifying..."
                : mode === "login"
                  ? "Login"
                  : "Create Account"}
            </button>

            {/* <button
              className="secondary"
              type="button"
              onClick={() => {
                setStep("phone");
                setOtp("");
                setError("");
                setSuccessMsg("");
              }}
              disabled={loading}
            >
              Change Phone
            </button> */}
          </form>
        )}

        {!locked && (
          <div className="auth-switch">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="switch-link"
                  onClick={() => setMode("signup")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="switch-link"
                  onClick={() => setMode("login")}
                >
                  Log in
                </button>
              </>
            )}
          </div>
        )}
        <div className="auth-footer-note"></div>
      </div>
    </div>
  );
}
