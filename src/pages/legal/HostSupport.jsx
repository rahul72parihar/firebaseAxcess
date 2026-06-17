import "./TermsAndConditions.css";
import Header from "../../components/Header.jsx";

const categories = [
  "Payout support",
  "Account review",
  "Session issues",
  "Policy questions",
];

export default function HostSupport() {
  return (
    <div className="ax-terms-page">
      <div className="container">
        <Header mode="default" showAuthButtons={true} />

        <div className="ax-terms-container">
          <header className="ax-terms-header">
            <h1>Host Support</h1>
            <p className="ax-terms-updated">We're here to help you.</p>
          </header>

          <p className="ax-terms-intro">
            For any host-related queries, reach out to us at{" "}
            <a href="mailto:hostsupport@axcess.app" style={{ color: "#7c3aed", fontWeight: 600 }}>
              hostsupport@axcess.app
            </a>
          </p>

          <ol className="ax-terms-list">
            <li>
              <strong>Support Categories</strong>
              <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                {categories.map((c, i) => (
                  <li key={i} style={{ marginBottom: 2 }}>{c}</li>
                ))}
              </ul>
            </li>
          </ol>

          <p style={{ marginTop: 20, fontSize: 14, color: "#6b7280", fontStyle: "italic" }}>
            Response times may vary.
          </p>
        </div>
      </div>
    </div>
  );
}
