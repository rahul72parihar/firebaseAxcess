# TODO

## Goal
Add Login/Signup popup modal and implement OTP-based login flow.

## Steps
1. Inspect existing UI entrypoints (Home header login button) and add modal trigger.
2. Create `src/auth/otpAuth.js` to simulate OTP sending/verification (no backend yet).
3. Create `src/components/AuthModal.jsx` implementing: phone/email input → send OTP → OTP entry → verify → success.
4. Add modal styles in `src/components/AuthModal.css`.
5. Wire modal open/close into `Home.jsx` login button.
6. Persist “logged-in” state in `sessionStorage` (or simple in-memory) and update Home UI after success.
7. Run `npm run lint` and `npm run build`.

