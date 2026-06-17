import "./CommunityGuidelines.css";
import Header from "../../components/Header.jsx";

const sections = [
  {
    title: "Respect First",
    items: ["No harassment or abusive behavior", "No hate speech or discrimination"],
  },
  {
    title: "Content Rules",
    label: "Users must not share:",
    items: [
      "Adult explicit content",
      "Illegal material",
      "Violence or threats",
      "Scam or misleading content",
    ],
  },
  {
    title: "Host Interaction Rules",
    items: [
      "Be polite during live sessions",
      "Do not pressure hosts",
      "Do not request off-platform payments",
    ],
  },
  {
    title: "Spam & Misuse",
    items: ["No spamming chat or calls", "No fake accounts"],
  },
  {
    title: "Safety Enforcement",
    label: "Violations may lead to:",
    items: ["Warning", "Temporary suspension", "Permanent ban"],
  },
];

export default function CommunityGuidelines() {
  return (
    <div className="ax-guidelines-page">
      <div className="container">
        <Header mode="default" showAuthButtons={true} />

        <div className="ax-guidelines-container">
          <header className="ax-guidelines-header">
            <h1>Community Guidelines</h1>
            <p className="ax-guidelines-subtitle">
              Axcess is built for respectful and safe interactions.
            </p>
          </header>

          <ol className="ax-guidelines-list">
            {sections.map((section, i) => (
              <li key={i}>
                <span className="ax-gl-number">{i + 1}</span>
                <div className="ax-gl-body">
                  <strong>{section.title}</strong>
                  {section.label && <p style={{ margin: "0 0 6px", fontSize: 14, color: "#374151" }}>{section.label}</p>}
                  <ul>
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
