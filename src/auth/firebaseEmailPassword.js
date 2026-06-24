// firebaseEmailPassword.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function signInWithEmailPassword({ email, password }) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmailPassword({ name, email, password, role = "user" }) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  const cred = await createUserWithEmailAndPassword(auth, email, password);

  if (name) {
    await updateProfile(cred.user, { displayName: name });
  }

  const collectionName = role === "host" ? "hosts" : "users";

  await setDoc(doc(db, collectionName, cred.user.uid), {
    uid: cred.user.uid,
    name: name || "",
    email: cred.user.email,
    role,
    createdAt: serverTimestamp(),
  });

  return cred;
}
