import "./TermsAndConditions.css";
import Header from "../../components/Header.jsx";

const sections = [
  {
    title: "Host Eligibility",
    intro: "To become a Host, you must:",
    must: [
      "Be at least 18 years old",
      "Have legal authority to provide services on the platform",
      "Provide accurate account information",
      "Comply with local laws and regulations",
    ],
    note: "Axcess may request verification when required.",
  },
  {
    title: "Host Account",
    intro: "Hosts are responsible for:",
    must: [
      "Keeping login credentials secure",
      "Maintaining accurate profile information",
      "Managing availability and schedules",
      "Protecting account access",
    ],
    note: "Hosts may not transfer accounts without approval.",
  },
  {
    title: "Sessions & Availability",
    body: "Hosts may create sessions through available platform tools.",
    intro: "Hosts are responsible for:",
    must: [
      "Starting sessions on time",
      "Managing participant capacity",
      "Providing accurate descriptions and expectations",
    ],
    note: "Axcess does not guarantee booking volume or earnings.",
  },
  {
    title: "Host Conduct",
    intro: "Hosts must:",
    must: [
      "Treat users respectfully",
      "Communicate professionally",
      "Avoid misleading promises",
      "Follow platform rules",
    ],
    mustNot: [
      "Harass users",
      "Request off-platform payments",
      "Share harmful, illegal, or prohibited content",
      "Manipulate ratings, reviews, or bookings",
    ],
  },
  {
    title: "Earnings & Payments",
    intro: "Host earnings are subject to:",
    must: [
      "Platform fees (if applicable)",
      "Payment processing rules",
      "Applicable taxes and legal obligations",
    ],
    note: "Payout timing and methods may vary. Axcess may delay payouts for fraud checks, disputes, or policy reviews.",
  },
  {
    title: "Cancellations & Refunds",
    intro: "Hosts understand:",
    must: [
      "Users may rely on booked sessions.",
      "Hosts should avoid unnecessary cancellations.",
    ],
    subIntro: "If a host repeatedly cancels or fails to appear:",
    sub: [
      "Visibility may be reduced",
      "Booking access may be limited",
      "Account action may occur",
    ],
    note: "Refund decisions remain subject to Axcess policies.",
  },
  {
    title: "Content Ownership & License",
    body: "Hosts retain ownership of content they create.",
    intro: "By uploading or publishing content on Axcess, Hosts grant Axcess a non-exclusive license to:",
    must: [
      "Display content",
      "Promote sessions",
      "Operate platform features",
    ],
    note: "Hosts confirm they have rights to uploaded content.",
  },
  {
    title: "Safety & Compliance",
    intro: "Hosts must not:",
    must: [
      "Promote illegal activity",
      "Share private user information",
      "Encourage unsafe behavior",
    ],
    note: "Axcess may monitor reports and investigate violations.",
  },
  {
    title: "Suspension & Removal",
    intro: "Axcess may suspend or remove Host access for:",
    must: [
      "Policy violations",
      "Fraud concerns",
      "Harmful conduct",
      "Repeated complaints",
      "Security risks",
    ],
    note: "Suspension may affect bookings and payouts.",
  },
  {
    title: "Taxes",
    intro: "Hosts are responsible for:",
    must: [
      "Personal tax reporting",
      "Government obligations",
      "Required registrations and filings",
    ],
    note: "Axcess does not provide tax advice.",
  },
  {
    title: "No Employment Relationship",
    body: "Hosting on Axcess does not create:",
    must: ["Employment", "Partnership", "Agency relationship"],
    note: "Hosts operate independently.",
  },
  {
    title: "Limitation of Liability",
    intro: "Axcess is not responsible for:",
    must: [
      "Lost earnings",
      "User actions",
      "Business decisions by Hosts",
      "Technical interruptions outside reasonable control",
    ],
  },
  {
    title: "Updates to Terms",
    body: "Axcess may update Host Terms periodically.",
    note: "Continued hosting means acceptance of updated terms.",
  },
];

export default function HostTerms() {
  return (
    <div className="ax-terms-page">
      <div className="container">
        <Header mode="default" showAuthButtons={true} />

        <div className="ax-terms-container">
          <header className="ax-terms-header">
            <h1>AXCESS – Host Terms &amp; Conditions</h1>
            <p className="ax-terms-updated">
              Last Updated: <strong>June 2026</strong>
            </p>
          </header>

          <p className="ax-terms-intro">
            These Host Terms apply to all individuals or entities that create,
            schedule, host, or earn through services on Axcess ("Host", "you",
            "your"). By becoming a Host on Axcess, you agree to these terms.
          </p>

          <ol className="ax-terms-list">
            {sections.map((s, i) => (
              <li key={i}>
                <strong>{s.title}</strong>

                {s.body && <p>{s.body}</p>}

                {s.intro && <p>{s.intro}</p>}

                {s.must && (
                  <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                    {s.must.map((item, j) => (
                      <li key={j} style={{ marginBottom: 2 }}>{item}</li>
                    ))}
                  </ul>
                )}

                {s.mustNot && (
                  <>
                    <p style={{ marginTop: 8 }}>Hosts must not:</p>
                    <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                      {s.mustNot.map((item, j) => (
                        <li key={j} style={{ marginBottom: 2 }}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                {s.subIntro && <p style={{ marginTop: 8 }}>{s.subIntro}</p>}

                {s.sub && (
                  <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                    {s.sub.map((item, j) => (
                      <li key={j} style={{ marginBottom: 2 }}>{item}</li>
                    ))}
                  </ul>
                )}

                {s.note && (
                  <p style={{ marginTop: 8, color: "#6b7280", fontStyle: "italic" }}>
                    {s.note}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
