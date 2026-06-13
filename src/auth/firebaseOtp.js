// firebaseOtp.js
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase"; // ✅ use shared auth, not getAuth(app)

let confirmationResult = null;

export function cleanupOtpSession() {
  confirmationResult = null;
}

function normalizeFirebaseError(err) {
  const code = err?.code || "";
  const message = err?.message || "";

  switch (code) {
    case "auth/invalid-app-credential":
      return "Invalid Firebase app credential. Check your Firebase config.";
    case "auth/missing-app-credential":
      return "Missing Firebase app credential. Check your Firebase config.";
    case "auth/unauthorized-domain":
      return "Unauthorized domain. Add your domain to Firebase Auth allowed domains.";
    case "auth/operation-not-allowed":
      return "Phone Authentication is disabled. Enable it in Firebase Console.";
    case "auth/too-many-requests":
      return "Too many requests. Please wait and try again.";
    case "auth/invalid-phone-number":
      return "Invalid phone number. Use international format like +14155552671.";
    case "auth/invalid-verification-code":
      return "Wrong OTP code. Please try again.";
    case "auth/code-expired":
      return "OTP expired. Please request a new one.";
    default:
      return message || "OTP failed. Please try again.";
  }
}

export async function sendOtp({ phoneNumber, appVerifier }) {
  if (!appVerifier) {
    throw new Error("Missing appVerifier (reCAPTCHA).");
  }

  // ✅ uses shared auth instance
  confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  return true;
}

export async function verifyOtp(code) {
  if (!confirmationResult) {
    throw new Error("OTP not sent yet. Please request OTP again.");
  }

  try {
    const res = await confirmationResult.confirm(code);
    return res;
  } catch (err) {
    throw new Error(normalizeFirebaseError(err), { cause: err });
  }
}