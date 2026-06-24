// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC7pFpgjcEw60YpG4prnqV0YexwRidbtSw",
  authDomain: "fir-axcess.firebaseapp.com",
  projectId: "fir-axcess",
  storageBucket: "fir-axcess.firebasestorage.app",
  messagingSenderId: "530971039228",
  appId: "1:530971039228:web:fe39dbd071580190ba0e79",
  measurementId: "G-H5VB1WFLDX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Single shared auth instance

export { app, analytics, auth };