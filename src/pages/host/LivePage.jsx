import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Reuses the same Header you already have. Adjust the relative path below
// if LivePage.jsx ends up in a different folder than this assumes
// (this assumes: src/pages/LivePage.jsx + src/components/Header.jsx).
import Header from "../../components/Header";

import {
  TbMicrophone,
  TbMicrophoneOff,
  TbVolume,
  TbVolumeOff,
  TbPhoneOff,
  TbClock,
  TbUsers,
  TbCurrencyRupee,
  TbShieldCheck,
  TbCheck,
  TbHourglass,
  TbUserX,
  TbBroadcast,
} from "react-icons/tb";

import "./LivePage.css";

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

// Converts an "mm:ss" string into total seconds, used to compute the
// progress bar fill %. Once a real timer/websocket drives elapsed time,
// this can stay as-is — just feed it live "mm:ss" strings.
function timeStringToSeconds(time) {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
}

function getProgressPercent(elapsed, total) {
  const elapsedSec = timeStringToSeconds(elapsed);
  const totalSec = timeStringToSeconds(total);
  if (!totalSec) return 0;
  return Math.min(100, Math.round((elapsedSec / totalSec) * 100));
}

// A few animated bars next to the active-call user, purely decorative —
// gives a "live audio" feel. No data needed here.
function AudioBars() {
  return (
    <span className="ax-audio-bars" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

// Small pulsing dot used next to "LIVE NOW" — purely decorative.
function LivePulseDot() {
  return (
    <span className="ax-live-pulse" aria-hidden="true">
      <span className="ax-live-pulse-core" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Active call bar (dark strip at the top)                            */
/* ------------------------------------------------------------------ */

function ActiveCallBar({ call, onToggleMute, onToggleSpeaker, onEndCall }) {
  // call is expected to look like:
  // {
  //   userLabel: "U1",
  //   userName: "User 1",
  //   elapsed: "04:00",
  //   duration: "05:00",
  //   durationLabel: "5 min",
  //   timeLeft: "01:00",
  //   isMuted: boolean,
  //   isSpeakerOn: boolean,
  // }
  if (!call) return null; // no active call right now -> hide this bar entirely

  return (
    <div className="ax-call-bar">
      <div className="ax-call-bar-left">
        <span className="ax-call-status">
          <span className="ax-call-status-dot" />
          ON CALL
        </span>

        <div className="ax-call-user">
          <span className="ax-call-avatar">{call.userLabel}</span>
          <div className="ax-call-user-info">
            <span className="ax-call-user-name">{call.userName}</span>
            <span className="ax-call-user-time">
              <AudioBars />
              {call.elapsed} / {call.duration}
            </span>
          </div>
        </div>
      </div>

      <div className="ax-call-bar-middle">
        <div className="ax-call-stat">
          <span className="ax-call-stat-label">Duration</span>
          <span className="ax-call-stat-value">{call.durationLabel}</span>
        </div>
        <div className="ax-call-stat">
          <span className="ax-call-stat-label">Time Left</span>
          <span className="ax-call-stat-value ax-call-stat-value--accent">
            {call.timeLeft}
          </span>
        </div>
      </div>

      <div className="ax-call-bar-right">
        <button
          type="button"
          className="ax-call-control"
          onClick={onToggleMute}
          aria-pressed={call.isMuted}
          aria-label={call.isMuted ? "Unmute" : "Mute"}
        >
          {call.isMuted ? (
            <TbMicrophoneOff size={20} />
          ) : (
            <TbMicrophone size={20} />
          )}
          <span>Mute</span>
        </button>

        <button
          type="button"
          className="ax-call-control"
          onClick={onToggleSpeaker}
          aria-pressed={call.isSpeakerOn}
          aria-label={call.isSpeakerOn ? "Turn speaker off" : "Turn speaker on"}
        >
          {call.isSpeakerOn ? (
            <TbVolume size={20} />
          ) : (
            <TbVolumeOff size={20} />
          )}
          <span>Speaker</span>
        </button>

        <button
          type="button"
          className="ax-call-control ax-call-control--end"
          onClick={onEndCall}
          aria-label="End call"
        >
          <TbPhoneOff size={20} />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  "You are live!" summary card                                       */
/* ------------------------------------------------------------------ */

function LiveSummaryCard({ stats }) {
  // stats is expected to look like:
  // {
  //   elapsedTime: "21:42",
  //   totalDuration: "90:00",
  //   sessionTime: "90 min",
  //   totalBooked: 18,
  //   totalEarning: 3150,
  // }
  return (
    <section className="ax-card ax-live-summary">
      <div className="ax-live-summary-top">
        <div className="ax-live-summary-badges">
          <span className="ax-badge ax-badge--live">
            <TbBroadcast size={14} />
            LIVE NOW
          </span>
          <LivePulseDot />
        </div>

        {/* TODO: replace stats.elapsedTime with a live ticking value,
            e.g. driven by setInterval or a server-sent timestamp */}
        <div className="ax-live-summary-elapsed">
          <span className="ax-live-summary-elapsed-label">Elapsed Time</span>
          <span className="ax-live-summary-elapsed-value">
            {stats.elapsedTime}
            <span className="ax-live-summary-elapsed-total">
              {" "}
              / {stats.totalDuration}
            </span>
          </span>
        </div>
      </div>

      <h1 className="ax-live-summary-title">You are live!</h1>
      <p className="ax-live-summary-subtitle">
        You're on air. We'll connect you with users one by one.
      </p>

      <div className="ax-live-summary-stats">
        <div className="ax-live-summary-stat">
          <span className="ax-icon-circle ax-icon-circle--gray">
            <TbClock size={18} />
          </span>
          <div>
            <span className="ax-live-summary-stat-label">Session Time</span>
            <span className="ax-live-summary-stat-value">
              {stats.sessionTime}
            </span>
          </div>
        </div>

        <div className="ax-live-summary-stat">
          <span className="ax-icon-circle ax-icon-circle--gray">
            <TbUsers size={18} />
          </span>
          <div>
            <span className="ax-live-summary-stat-label">Total Booked</span>
            {/* TODO: source from API instead of bookedSlots.length if the
                backend tracks this independently of the visible slot list */}
            <span className="ax-live-summary-stat-value">
              {stats.totalBooked} Users
            </span>
          </div>
        </div>

        <div className="ax-live-summary-stat">
          <span className="ax-icon-circle ax-icon-circle--green">
            <TbCurrencyRupee size={18} />
          </span>
          <div>
            <span className="ax-live-summary-stat-label">Total Earning</span>
            <span className="ax-live-summary-stat-value">
              ₹{stats.totalEarning.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="ax-live-summary-secure">
          <TbShieldCheck size={18} />
          Calls are secure and encrypted
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Status pill used inside the booked-slots table                     */
/* ------------------------------------------------------------------ */

function SlotStatus({ status }) {
  // status is one of: "completed" | "preparing" | "waiting" | "missed"
  if (status === "completed") {
    return (
      <span className="ax-slot-status ax-slot-status--completed">
        <span className="ax-slot-status-dot">
          <TbCheck size={11} strokeWidth={3} />
        </span>
        COMPLETED
      </span>
    );
  }

  if (status === "preparing") {
    return (
      <span className="ax-slot-status ax-slot-status--preparing">
        <TbClock size={15} />
        PREPARING
      </span>
    );
  }

  if (status === "missed") {
    return (
      <span className="ax-slot-status ax-slot-status--missed">
        <TbUserX size={15} />
        MISSED
      </span>
    );
  }

  // default / fallback
  return (
    <span className="ax-slot-status ax-slot-status--waiting">
      <TbHourglass size={15} />
      WAITING
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Booked slots table                                                 */
/* ------------------------------------------------------------------ */

function BookedSlotsTable({ slots }) {
  // Show the first 11 by default, reveal the rest on "View all".
  // TODO: once the slot list is paginated by the API, swap this client-side
  // slice for real pagination / "load more" requests.
  const PREVIEW_COUNT = 11;
  const [showAll, setShowAll] = useState(false);

  const visibleSlots = showAll ? slots : slots.slice(0, PREVIEW_COUNT);
  const remainingCount = slots.length - PREVIEW_COUNT;

  return (
    <section className="ax-card ax-slots-card">
      <div className="ax-slots-header">
        <div className="ax-slots-heading">
          <h2 className="ax-card-title">All Booked Slots</h2>
          <span className="ax-badge ax-badge--soft">{slots.length} Users</span>
        </div>
        <p className="ax-slots-subtitle">
          Users will be called in this order. Users are alerted automatically
          before their turn.
        </p>
      </div>

      <div className="ax-slots-table-wrap">
        <table className="ax-slots-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleSlots.map((slot, index) => (
              <tr
                key={slot.id}
                className={
                  slot.status === "preparing"
                    ? "ax-slot-row--preparing"
                    : undefined
                }
              >
                <td data-label="#">{index + 1}</td>
                <td data-label="User">
                  <span className="ax-slot-user">
                    <span className="ax-slot-avatar">{slot.userLabel}</span>
                    {slot.userName}
                  </span>
                </td>
                <td data-label="Duration">
                  <span className="ax-badge ax-badge--soft">
                    {slot.duration}
                  </span>
                </td>
                <td data-label="Status">
                  <SlotStatus status={slot.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ax-slots-footer">
        {!showAll && remainingCount > 0 ? (
          <span className="ax-slots-more">+{remainingCount} more users</span>
        ) : (
          <span />
        )}

        {slots.length > PREVIEW_COUNT && (
          <button
            type="button"
            className="ax-slots-view-all"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less" : "View all"}
          </button>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Session overview footer (stat boxes + progress bar)                */
/* ------------------------------------------------------------------ */

function SessionOverviewFooter({ overview, elapsedTime, totalDuration }) {
  // overview is expected to look like:
  // { completed: 6, missed: 1, remaining: 11, timeLeft: "68:18" }
  const progressPercent = getProgressPercent(elapsedTime, totalDuration);

  return (
    <section className="ax-card ax-overview-card">
      <div className="ax-overview-heading">
        <h2 className="ax-card-title">Session Overview</h2>
        <p className="ax-slots-subtitle">Live overview of your session</p>
      </div>

      <div className="ax-overview-stats">
        <div className="ax-overview-stat ax-overview-stat--green">
          <span className="ax-icon-square ax-icon-square--green">
            <TbCheck size={18} strokeWidth={3} />
          </span>
          <div>
            <span className="ax-overview-stat-label">Completed</span>
            <span className="ax-overview-stat-value">{overview.completed}</span>
          </div>
        </div>

        <div className="ax-overview-stat ax-overview-stat--orange">
          <span className="ax-icon-square ax-icon-square--orange">
            <TbUserX size={18} />
          </span>
          <div>
            <span className="ax-overview-stat-label">Missed</span>
            <span className="ax-overview-stat-value">{overview.missed}</span>
          </div>
        </div>

        <div className="ax-overview-stat ax-overview-stat--gray">
          <span className="ax-icon-square ax-icon-square--gray">
            <TbHourglass size={18} />
          </span>
          <div>
            <span className="ax-overview-stat-label">Remaining</span>
            <span className="ax-overview-stat-value">{overview.remaining}</span>
          </div>
        </div>

        <div className="ax-overview-stat ax-overview-stat--blue">
          <span className="ax-icon-square ax-icon-square--blue">
            <TbClock size={18} />
          </span>
          <div>
            <span className="ax-overview-stat-label">Time Left</span>
            <span className="ax-overview-stat-value">{overview.timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="ax-overview-progress">
        <div className="ax-overview-progress-track">
          <div
            className="ax-overview-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="ax-overview-progress-dot"
            style={{ left: `${progressPercent}%` }}
          />
        </div>
        <div className="ax-overview-progress-labels">
          <div className="ax-overview-progress-label">
            <span className="ax-overview-progress-time">{elapsedTime}</span>
            <span>Session Elapsed</span>
          </div>
          <div className="ax-overview-progress-secure">
            <TbShieldCheck size={14} />
            All calls are secure and encrypted
          </div>
          <div className="ax-overview-progress-label ax-overview-progress-label--right">
            <span className="ax-overview-progress-time">{totalDuration}</span>
            <span>Session Duration</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LivePage() {
  const navigate = useNavigate();
  // ---------------------------------------------------------------
  // MOCK STATE — everything below should eventually be replaced by
  // real data (initial fetch + live updates via polling/websocket).
  // Kept as local state for now so the UI is fully wired and ready
  // to swap data sources without touching the JSX below.
  // ---------------------------------------------------------------

  // TODO: fetch current call from the active-session API / call socket
  const [activeCall, setActiveCall] = useState({
    userLabel: "U1",
    userName: "User 1",
    elapsed: "04:00",
    duration: "05:00",
    durationLabel: "5 min",
    timeLeft: "01:00",
    isMuted: false,
    isSpeakerOn: true,
  });

  // TODO: fetch from GET /api/sessions/:id/summary
  const [liveStats] = useState({
    elapsedTime: "21:42",
    totalDuration: "90:00",
    sessionTime: "90 min",
    totalBooked: 18,
    totalEarning: 3150,
  });

  // TODO: fetch from GET /api/sessions/:id/slots (paginated in the future)
  const [bookedSlots] = useState([
    {
      id: 1,
      userLabel: "U1",
      userName: "User 1",
      duration: "90 min",
      status: "completed",
    },
    {
      id: 2,
      userLabel: "U2",
      userName: "User 2",
      duration: "90 min",
      status: "preparing",
    },
    {
      id: 3,
      userLabel: "U3",
      userName: "User 3",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 4,
      userLabel: "U4",
      userName: "User 4",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 5,
      userLabel: "U5",
      userName: "User 5",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 6,
      userLabel: "U6",
      userName: "User 6",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 7,
      userLabel: "U7",
      userName: "User 7",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 8,
      userLabel: "U8",
      userName: "User 8",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 9,
      userLabel: "U9",
      userName: "User 9",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 10,
      userLabel: "U10",
      userName: "User 10",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 11,
      userLabel: "U11",
      userName: "User 11",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 12,
      userLabel: "U12",
      userName: "User 12",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 13,
      userLabel: "U13",
      userName: "User 13",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 14,
      userLabel: "U14",
      userName: "User 14",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 15,
      userLabel: "U15",
      userName: "User 15",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 16,
      userLabel: "U16",
      userName: "User 16",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 17,
      userLabel: "U17",
      userName: "User 17",
      duration: "90 min",
      status: "waiting",
    },
    {
      id: 18,
      userLabel: "U18",
      userName: "User 18",
      duration: "90 min",
      status: "waiting",
    },
  ]);

  // TODO: fetch from GET /api/sessions/:id/overview (or derive on the
  // backend from the slot list above — keeping it separate here since
  // the mock numbers intentionally mirror the original design)
  const [overview] = useState({
    completed: 6,
    missed: 1,
    remaining: 11,
    timeLeft: "68:18",
  });
  const [showEndCallModal, setShowEndCallModal] = useState(false);

  // ---------------------------------------------------------------
  // Handlers — wire these up to the real call/session API
  // ---------------------------------------------------------------

  const handleToggleMute = () => {
    // TODO: call WebRTC/audio SDK mute toggle here
    setActiveCall((prev) =>
      prev ? { ...prev, isMuted: !prev.isMuted } : prev,
    );
  };

  const handleToggleSpeaker = () => {
    // TODO: call WebRTC/audio SDK speaker toggle here
    setActiveCall((prev) =>
      prev ? { ...prev, isSpeakerOn: !prev.isSpeakerOn } : prev,
    );
  };

  const handleEndCall = () => {
    setShowEndCallModal(true);
  };

  const confirmEndCall = () => {
    // TODO(api): call POST /api/sessions/:id/end to finalize the session on
    // the backend (total calls, earnings) before navigating — SessionEndedPage
    // currently expects that summary data to already exist server-side.
    setActiveCall(null);
    setShowEndCallModal(false);
    navigate("/host/session-ended");
  };

  const cancelEndCall = () => {
    setShowEndCallModal(false);
  };

  return (
    <div className="ax-live-page">
      {/* NOTE: the screenshot this page was built from shows a notification
          bell next to the avatar in the header. The shared Header component
          doesn't currently render one — add it there if you want it on
          every page, rather than duplicating header markup here. */}
      <Header mode="create" loggedIn userName="Aisha" />

      <main className="ax-live-content">
        <ActiveCallBar
          call={activeCall}
          onToggleMute={handleToggleMute}
          onToggleSpeaker={handleToggleSpeaker}
          onEndCall={handleEndCall}
        />

        <LiveSummaryCard stats={liveStats} />

        <BookedSlotsTable slots={bookedSlots} />

        <SessionOverviewFooter
          overview={overview}
          elapsedTime={liveStats.elapsedTime}
          totalDuration={liveStats.totalDuration}
        />
      </main>
      {showEndCallModal && (
        <div className="ax-modal-overlay">
          <div className="ax-modal">
            <h3 className="ax-modal-title">End Call?</h3>

            <p className="ax-modal-text">
              Are you sure you want to end this call?
            </p>

            <div className="ax-modal-actions">
              <button
                type="button"
                className="ax-modal-btn ax-modal-btn--cancel"
                onClick={cancelEndCall}
              >
                Cancel
              </button>

              <button
                type="button"
                className="ax-modal-btn ax-modal-btn--danger"
                onClick={confirmEndCall}
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
