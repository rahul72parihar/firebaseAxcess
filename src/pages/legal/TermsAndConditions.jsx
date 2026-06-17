import "./TermsAndConditions.css";
import Header from "../../components/Header.jsx";

export default function TermsAndConditions() {
  return (
    <div className="ax-terms-page">
      <div className="container">
        <Header mode="default" showAuthButtons={true} />

        <div className="ax-terms-container">
          <header className="ax-terms-header">
            <h1>AXCESS – Terms &amp; Conditions</h1>
            <p className="ax-terms-updated">
              Last Updated: <strong>June 2026</strong>
            </p>
          </header>

          <p className="ax-terms-intro">
            Welcome to Axcess. By accessing or using our platform, you agree to
            these Terms &amp; Conditions.
          </p>

          <ol className="ax-terms-list">
            <li>
              <strong>Platform Overview</strong>
              <p>
                Axcess is a digital platform that enables users to connect with
                hosts through live sessions, video interactions, and scheduled
                engagements.
              </p>
            </li>

            <li>
              <strong>Eligibility</strong>
              <p>You must be at least 18 years old to use Axcess.</p>
            </li>

            <li>
              <strong>User Accounts</strong>
              <p>
                You are responsible for your account activity.
                <br />
                You must provide accurate information.
                <br />
                We reserve the right to suspend accounts for misuse.
              </p>
            </li>

            <li>
              <strong>Sessions &amp; Services</strong>
              <p>
                Each live interaction is time-based or session-based.
                <br />
                Availability depends on host scheduling.
                <br />
                Axcess does not guarantee uninterrupted availability.
              </p>
            </li>

            <li>
              <strong>Payments</strong>
              <p>
                All payments are processed before or during booking.
                <br />
                Pricing is displayed clearly before purchase.
              </p>
            </li>

            <li>
              <strong>No Refund Policy 🚫</strong>
              <p>
                All payments made on Axcess are strictly non-refundable.
                <br />
                This includes:
                <br />
                Missed sessions
                <br />
                Partial usage
                <br />
                User dissatisfaction
                <br />
                Technical interruptions not caused by Axcess fraud or system
                failure
                <br />
                By purchasing, you agree to this no-refund policy.
              </p>
            </li>

            <li>
              <strong>Prohibited Use</strong>
              <p>
                Users must not:
                <br />
                Harass or abuse hosts
                <br />
                Share illegal content
                <br />
                Attempt fraud or chargebacks
                <br />
                Misuse platform features
              </p>
            </li>

            <li>
              <strong>Termination</strong>
              <p>
                Axcess may suspend or terminate accounts without notice if rules
                are violated.
              </p>
            </li>

            <li>
              <strong>Limitation of Liability</strong>
              <p>
                Axcess is not responsible for:
                <br />
                User interactions
                <br />
                Host behavior
                <br />
                Personal disputes
                <br />
                Losses from service usage
              </p>
            </li>

            <li>
              <strong>Changes to Terms</strong>
              <p>Axcess may update these terms anytime.</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

