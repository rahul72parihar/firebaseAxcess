import { createSlice } from "@reduxjs/toolkit";

const stored = (() => {
  try {
    const raw = sessionStorage.getItem("axcess_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: Boolean(stored?.uid),
    uid: stored?.uid ?? null,
    phone: stored?.phone ?? null,
    role: stored?.role ?? "user", // "user" | "host"
  },
  reducers: {
    loginSuccess(state, action) {
      state.loggedIn = true;
      state.uid = action.payload.uid;
      state.phone = action.payload.phone;
      state.role = action.payload.role ?? "user";
    },
    logout(state) {
      state.loggedIn = false;
      state.uid = null;
      state.phone = null;
      sessionStorage.removeItem("axcess_auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
