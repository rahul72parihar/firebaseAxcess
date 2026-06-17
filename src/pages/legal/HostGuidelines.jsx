import "./TermsAndConditions.css";
import Header from "../../components/Header.jsx";

const sections = [
  {
    title: "Professional Experience",
    items: [
      "Start on time",
      "Respect booked users",
      "Maintain session quality",
    ],
  },
  {
    title: "Fair Use",
    items: [
      "No fake engagement",
      "No artificial booking manipulation",
    ],
  },
  {
    title: "Privacy",
    items: [
      "Do not record users without permission",
      "Do not disclose personal information",
    ],
  },
  {
    title: "Payments",
    items: ["Keep transactions inside Axcess"],
  },
  {
    title: "Respect",
    items: ["No discrimination, threats, exploitation, or abuse"],
  },
];

export default function HostGuidelines() {
  return (
    <div className="ax-terms-page">
      <div className="container">
        <Header mode="default" showAuthButtons={true} />

        <div className="ax-terms-container">
          <header className="ax-terms-header">
            <h1>AXCESS – Host Community Guidelines</h1>
            <p className="ax-terms-updated">
              Last Updated: <strong>June 2026</strong>
            </p>
          </header>

          <ol className="ax-terms-list">
            {sections.map((s, i) => (
              <li key={i}>
                <strong>{s.title}</strong>
                <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                  {s.items.map((item, j) => (
                    <li key={j} style={{ marginBottom: 2 }}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <p style={{ marginTop: 20, fontSize: 14, color: "#6b7280", fontStyle: "italic" }}>
            Violation may lead to warnings, restrictions, suspension, or permanent removal.
          </p>
        </div>
      </div>
    </div>
  );
}
