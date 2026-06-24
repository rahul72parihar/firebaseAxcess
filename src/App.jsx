import { Route, Routes } from "react-router-dom";

// Dev navigator
import DevNav from "./pages/DevNav.jsx";

// User pages
import Home from "./pages/user/Home.jsx";
import QueuePage from "./pages/user/QueuePage.jsx";
import Callpage from "./pages/user/CallPage.jsx";
import JoinSessionPage from "./pages/user/JoinSessionPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Host pages
import HostLoginPage from "./pages/host/HostLoginPage.jsx";
import HostDashboardPage from "./pages/host/HostDashboardPage.jsx";
import CreateSessionPage from "./pages/host/CreateSessionPage.jsx";
import PreLiveSetupPage from "./pages/host/PreLiveSetupPage.jsx";
import LivePage from "./pages/host/LivePage.jsx";
import SessionEndedPage from "./pages/host/SessionEndedPage.jsx";

// Legal pages
import TermsAndConditions from "./pages/legal/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy.jsx";
import CommunityGuidelines from "./pages/legal/CommunityGuidelines.jsx";
import HostTerms from "./pages/legal/HostTerms.jsx";
import HostGuidelines from "./pages/legal/HostGuidelines.jsx";
import HostSupport from "./pages/legal/HostSupport.jsx";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Dev navigator */}
      <Route path="/" element={<DevNav />} />

      {/* User routes */}
      <Route path="/home" element={<Home />} />
      <Route
        path="/queue"
        element={
          <ProtectedRoute redirectTo="/home">
            <QueuePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/call"
        element={
          <ProtectedRoute redirectTo="/home">
            <Callpage />
          </ProtectedRoute>
        }
      />
      {/* Public on purpose — this is the link hosts share, so it must work
          for visitors who haven't logged in yet. */}
      <Route path="/join/:hostUid" element={<JoinSessionPage />} />

      {/* Host routes */}
      <Route path="/host/login" element={<HostLoginPage />} />
      <Route
        path="/host/dashboard"
        element={
          <ProtectedRoute role="host" redirectTo="/host/login">
            <HostDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/session"
        element={
          <ProtectedRoute role="host" redirectTo="/host/login">
            <CreateSessionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/prelive"
        element={
          <ProtectedRoute role="host" redirectTo="/host/login">
            <PreLiveSetupPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/live"
        element={
          <ProtectedRoute role="host" redirectTo="/host/login">
            <LivePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/session-ended"
        element={
          <ProtectedRoute role="host" redirectTo="/host/login">
            <SessionEndedPage />
          </ProtectedRoute>
        }
      />

      {/* Legal */}
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/guidelines" element={<CommunityGuidelines />} />
      <Route path="/host/terms" element={<HostTerms />} />
      <Route path="/host/guidelines" element={<HostGuidelines />} />
      <Route path="/host/support" element={<HostSupport />} />

      <Route path="*" element={<DevNav />} />
    </Routes>
  );
}

export default App;
