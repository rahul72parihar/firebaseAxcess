import { Route, Routes } from "react-router-dom";

// User pages
import Home from "./pages/user/Home.jsx";
import QueuePage from "./pages/user/QueuePage.jsx";
import Callpage from "./pages/user/CallPage.jsx";

// Host pages
import CreateSessionPage from "./pages/host/CreateSessionPage.jsx";
import LivePage from "./pages/host/LivePage.jsx";

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
      {/* User routes */}
      <Route path="/" element={<Home />} />
      <Route path="/queue" element={<QueuePage />} />
      <Route path="/call" element={<Callpage />} />

      {/* Host routes */}
      <Route path="/host/session" element={<CreateSessionPage />} />
      <Route path="/host/live" element={<LivePage />} />

      {/* Legal */}
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/guidelines" element={<CommunityGuidelines />} />
      <Route path="/host/terms" element={<HostTerms />} />
      <Route path="/host/guidelines" element={<HostGuidelines />} />
      <Route path="/host/support" element={<HostSupport />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
