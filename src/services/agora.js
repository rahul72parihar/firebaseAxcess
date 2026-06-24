import AgoraRTC from "agora-rtc-sdk-ng";

// Dev-only: joining with App ID and no token. This only works while
// "App Certificate enforcement" is OFF for this app in the Agora console
// (Project Management -> your project -> Edit -> disable the certificate,
// or just use the App ID without enabling a certificate). If it's enabled,
// join() below will fail with "dynamic use static key" / CAN_NOT_GET_GATEWAY_SERVER.
// This is NOT safe for production — anyone with the App ID can join any
// channel. Move to server-minted tokens before launch.
const AGORA_APP_ID = "24673e79ae204580bc6d6ffc2050b589";

/**
 * Joins an Agora RTC voice channel, captures the mic, and publishes it.
 * Returns a handle with mute/leave controls for the caller to wire up
 * mute/speaker/end-call buttons.
 */
export async function joinVoiceChannel({ channelName }) {
  if (!channelName) {
    throw new Error("channelName is required to join an Agora call.");
  }

  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  await client.join(AGORA_APP_ID, channelName, null, null);

  const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  await client.publish([localAudioTrack]);

  client.on("user-published", async (remoteUser, mediaType) => {
    await client.subscribe(remoteUser, mediaType);
    if (mediaType === "audio") {
      remoteUser.audioTrack?.play();
    }
  });

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
