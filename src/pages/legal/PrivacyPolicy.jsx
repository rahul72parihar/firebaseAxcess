import "./PrivacyPolicy.css";
import Header from "../../components/Header.jsx";

export default function PrivacyPolicy() {
  return (
    <div className="ax-privacy-page">
      <div className="container">
        <Header mode="default" showAuthButtons={true} />

        <div className="ax-privacy-container">
          <header className="ax-privacy-header">
            <h1>AXCESS – Privacy Policy</h1>
            <p className="ax-privacy-updated">
              Last Updated: <strong>June 2026</strong>
            </p>
          </header>

          <div className="ax-privacy-section">
            <h2>1. Information We Collect</h2>
            <p>
              We may collect:
            </p>
            <ul>
              <li>Name, email, phone number</li>
              <li>Profile data</li>
              <li>Payment details (via third-party gateways)</li>
              <li>Usage data (sessions, activity)</li>
            </ul>
          </div>

          <div className="ax-privacy-section">
            <h2>2. How We Use Data</h2>
            <p>
              We use data to:
            </p>
            <ul>
              <li>Provide services</li>
              <li>Improve user experience</li>
              <li>Process payments</li>
              <li>Maintain safety and security</li>
            </ul>
          </div>

          <div className="ax-privacy-section">
            <h2>3. Data Sharing</h2>
            <ul>
              <li>We do not sell your personal data.</li>
              <li>
                We may share limited data with:
                <ul>
                  <li>Payment processors</li>
                  <li>Legal authorities (if required)</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="ax-privacy-section">
            <h2>4. Data Security</h2>
            <p>
              We use standard security practices to protect your data, but cannot
              guarantee 100% security.
            </p>
          </div>

          <div className="ax-privacy-section">
            <h2>5. Cookies &amp; Tracking</h2>
            <p>
              We may use cookies to improve platform performance and analytics.
            </p>
          </div>

          <div className="ax-privacy-section">
            <h2>6. User Rights</h2>
            <p>
              You can:
            </p>
            <ul>
              <li>Request account deletion</li>
              <li>Update personal data</li>
              <li>Opt out of communications</li>
            </ul>
          </div>

          <div className="ax-privacy-section">
            <h2>7. Third-Party Services</h2>
            <p>
              Axcess may use third-party tools (payment, analytics). Their policies
              apply separately.
            </p>
          </div>

          <div className="ax-privacy-section">
            <h2>8. Changes</h2>
            <p>
              We may update this policy anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

