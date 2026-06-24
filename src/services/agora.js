import AgoraRTC from "agora-rtc-sdk-ng";

const AGORA_APP_ID = "24673e79ae204580bc6d6ffc2050b589";

// This Agora project has App Certificate enforcement on (newer projects can't
// disable it), so every join requires a token. There's no backend yet, so
// this is a temp token generated manually from the Agora Console
// (Project -> Security -> Generate Temp Token) for ONE fixed channel.
// It expires (~24h) — when calls stop connecting, generate a fresh temp
// token for DEMO_CHANNEL and paste it in below. Replace with real
// server-minted per-channel tokens before launch.
const TEMP_TOKEN =
  "007eJxTYHD/KK7V0a0jfcV1Cet5zsxvMu+5641PZyuExj7bt10wd5ICg5GJmblxqrllYqqRgYmphUFSslmKWVpaspGBqUGSqYWl2A7rrIZARoZLit4MjFAI4vMxZOQXl+img+bm64JYDAwA5Zgg0Q==";

export const DEMO_CHANNEL = "host-demo-host";

/**
 * Joins an Agora RTC voice channel, captures the mic, and publishes it.
 * Returns a handle with mute/leave controls for the caller to wire up
 * mute/speaker/end-call buttons.
 *
 * NOTE: only DEMO_CHANNEL is currently joinable — the temp token above is
 * only valid for that exact channel name.
 */
export async function joinVoiceChannel({ channelName, onRemoteUsersChange }) {
  if (!channelName) {
    throw new Error("channelName is required to join an Agora call.");
  }

  if (channelName !== DEMO_CHANNEL) {
    throw new Error(
      `Only "${DEMO_CHANNEL}" is joinable right now (temp token is channel-specific). Generate a new temp token for "${channelName}" or switch back to DEMO_CHANNEL.`,
    );
  }

  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const remoteUsers = new Map();

  const notifyRemoteUsers = () => {
    onRemoteUsersChange?.(Array.from(remoteUsers.values()));
  };

  // Register listeners before join()/publish() — if attached after, a
  // remote user that publishes in that window can be missed.
  client.on("user-joined", (remoteUser) => {
    remoteUsers.set(remoteUser.uid, remoteUser);
    notifyRemoteUsers();
  });

  client.on("user-left", (remoteUser) => {
    remoteUsers.delete(remoteUser.uid);
    notifyRemoteUsers();
  });

  client.on("user-published", async (remoteUser, mediaType) => {
    await client.subscribe(remoteUser, mediaType);
    if (mediaType === "audio") {
      remoteUser.audioTrack?.play();
    }
  });

  client.on("user-unpublished", (remoteUser, mediaType) => {
    if (mediaType === "audio") {
      remoteUser.audioTrack?.stop();
    }
  });

  await client.join(AGORA_APP_ID, channelName, TEMP_TOKEN, 0);

  // Catches anyone who joined the channel before us, since "user-joined"
  // only fires for users who join after we're already connected.
  client.remoteUsers.forEach((remoteUser) => remoteUsers.set(remoteUser.uid, remoteUser));
  notifyRemoteUsers();

  const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  await client.publish([localAudioTrack]);

  let muted = false;

  return {
    client,
    localAudioTrack,

    async setMuted(next) {
      muted = next;
      await localAudioTrack.setEnabled(!muted);
      return muted;
    },

    async toggleMuted() {
      return this.setMuted(!muted);
    },

    isMuted() {
      return muted;
    },

    async leave() {
      localAudioTrack.stop();
      localAudioTrack.close();
      await client.leave();
    },
  };
}
