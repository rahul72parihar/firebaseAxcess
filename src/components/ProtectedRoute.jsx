import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Guards a route behind login (and optionally a specific role). Unauthorized
// visitors are bounced to redirectTo, with the page they tried to reach kept
// in location state so the login page could send them back afterwards.
export default function ProtectedRoute({ role, redirectTo, children }) {
  const auth = useSelector((s) => s.auth);
  const location = useLocation();

  if (!auth.loggedIn) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (role && auth.role !== role) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
