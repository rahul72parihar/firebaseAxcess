import { useEffect, useMemo, useRef, useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "../firebase";

import "./AuthModal.css";
import { cleanupOtpSession, sendOtp, verifyOtp } from "../auth/firebaseOtp";
import { signInWithEmailPassword, signUpWithEmailPassword } from "../auth/firebaseEmailPassword";
import { loginSuccess } from "../store/authSlice";

function friendlyAuthError(err) {
  const code = err?.code || "";
  if (code.includes("email-already-in-use")) return "An account with this email already exists.";
  if (code.includes("invalid-email")) return "Enter a valid email address.";
  if (code.includes("weak-password")) return "Password must be at least 6 characters.";
  if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
    return "Incorrect email or password.";
  }
  if (code.includes("too-many-requests")) return "Too many attempts. Please try again later.";
  return err?.message || "Something went wrong. Please try again.";
}

export default function AuthModal({ open, onClose }) {
  const dispatch = useDispatch();

  const [mode, setMode] = useState("login");
  const [authMethod, setAuthMethod] = useState("phone"); // phone | email

  const [step, setStep] = useState("phone"); // for phone OTP flow

  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");

  // email/password (login + signup)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      setMode("login");
      setAuthMethod("phone");
      setStep("phone");

      setPhoneNumber("+91");
      setOtp("");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setError("");
      setSuccessMsg("");
      setLoading(false);
      setAgreeTerms(false);
      setLocked(false);
    });
  }, [open]);

  const canSendOtp = useMemo(() => {
    const cleaned = phoneNumber.replace(/\s+/g, "");
    return cleaned.startsWith("+") && cleaned.length >= 8;
  }, [phoneNumber]);

  const nationalNumber = phoneNumber.startsWith("+91")
    ? phoneNumber.slice(3)
    : phoneNumber.replace(/^\+/, "");

  async function handleSendOtp(e) {
    e?.preventDefault();

    setError("");
    setSuccessMsg("");

    const cleaned = phoneNumber.replace(/\s+/g, "");

    if (!cleaned.startsWith("+")) {
      setError("Enter phone number in international format (e.g. +14155552671)");
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

  async function handleVerifyOtp(e) {
    e?.preventDefault();

    setError("");
    setSuccessMsg("");

    try {
      setLoading(true);

      const res = await verifyOtp(otp.trim());
      const user = res?.user;

      const uid = user?.uid;
      const phone = user?.phoneNumber || phoneNumber;

      sessionStorage.setItem(
        "axcess_auth",
        JSON.stringify({ uid, phone, signedInAt: Date.now() }),
      );

      dispatch(loginSuccess({ uid, phone }));

      setSuccessMsg("Logged in successfully");
      onClose?.();
    } catch (err) {
      console.error(err);
      setError(friendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailLogin(e) {
    e?.preventDefault();

    setError("");
    setSuccessMsg("");

    try {
      setLoading(true);
      const res = await signInWithEmailPassword({
        email: email.trim(),
        password,
      });

      const uid = res?.user?.uid;

      sessionStorage.setItem(
        "axcess_auth",
        JSON.stringify({ uid, phone: null, signedInAt: Date.now() }),
      );

      dispatch(loginSuccess({ uid, phone: null }));

      setSuccessMsg("Logged in successfully");
      onClose?.();
    } catch (err) {
      console.error(err);
      setError(friendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignup(e) {
    e?.preventDefault();

    setError("");
    setSuccessMsg("");

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await signUpWithEmailPassword({
        name: name.trim(),
        email: email.trim(),
        password,
        role: "user",
      });

      const uid = res?.user?.uid;

      sessionStorage.setItem(
        "axcess_auth",
        JSON.stringify({ uid, phone: null, role: "user", signedInAt: Date.now() }),
      );

      dispatch(loginSuccess({ uid, phone: null, role: "user" }));

      setSuccessMsg("Account created successfully");
      onClose?.();
    } catch (err) {
      console.error(err);
      setError(friendlyAuthError(err));
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

        <div className="auth-method-toggle">
          <button
            type="button"
            className={authMethod === "phone" ? "auth-method-btn active" : "auth-method-btn"}
            onClick={() => {
              setAuthMethod("phone");
              setStep("phone");
              setError("");
              setLocked(false);
            }}
            disabled={loading}
          >
            Phone OTP
          </button>

          <button
            type="button"
            className={authMethod === "email" ? "auth-method-btn active" : "auth-method-btn"}
            onClick={() => {
              setAuthMethod("email");
              setError("");
              setLocked(false);
            }}
            disabled={loading}
          >
            Email & Password
          </button>
        </div>

        {authMethod === "phone" ? (
          step === "phone" ? (
            <form className="auth-form" onSubmit={handleSendOtp}>
              <div className="field">
                <label>Phone Number</label>

                <div className="phone-input-group">
                  <span className="phone-prefix">+91</span>

                  <input
                    value={nationalNumber}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(`+91${digitsOnly}`);
                      if (digitsOnly.trim().length > 0) setLocked(true);
                    }}
                    placeholder="9876543210"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                  />
                </div>

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
                disabled={!canSendOtp || loading || (mode === "signup" && !agreeTerms)}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleVerifyOtp}>
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
            </form>
          )
        ) : mode === "login" ? (
          <form className="auth-form" onSubmit={handleEmailLogin}>
            <div className="field">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
              />
            </div>

            {error && <div className="error">{error}</div>}
            {successMsg && <div className="success">{successMsg}</div>}

            <button
              className="primary"
              type="submit"
              disabled={loading || !email.trim() || !password}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleEmailSignup}>
            <div className="field">
              <label>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                type="text"
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                type="password"
                autoComplete="new-password"
              />
            </div>

            <div className="field">
              <label>Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
              />
            </div>

            <label className="terms-check">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            {error && <div className="error">{error}</div>}
            {successMsg && <div className="success">{successMsg}</div>}

            <button
              className="primary"
              type="submit"
              disabled={
                loading ||
                !name.trim() ||
                !email.trim() ||
                password.length < 6 ||
                !confirmPassword ||
                !agreeTerms
              }
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        {/* mode switch for both phone OTP and email/password flows */}
        {(authMethod === "email" || (authMethod === "phone" && !locked)) && (
          <div className="auth-switch">
            {mode === "login" ? (
              <>
                Don't have an account{" "}
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
                Already have an account{" "}
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

