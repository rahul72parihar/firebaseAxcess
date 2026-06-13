// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD5D4S60IwFtT-PSYMKu3zGOBdd9Y1rr38",
  authDomain: "iwsaxcess.firebaseapp.com",
  projectId: "iwsaxcess",
  storageBucket: "iwsaxcess.firebasestorage.app",
  messagingSenderId: "342742581460",
  appId: "1:342742581460:web:88b735fb0e119452f5fb41",
  measurementId: "G-CWWP1DMB1W",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Single shared auth instance

export { app, analytics, auth };