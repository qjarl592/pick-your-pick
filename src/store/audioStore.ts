import { getContext, getTransport, loaded, Player, start } from "tone";
import { create } from "zustand";

export type AudioTrackId = "bass" | "drum" | "guitar" | "others" | "piano" | "vocal";

interface AudioTrack {
  player: Player;
  isMuted: boolean;
  volume: number;
}

type AudioTrackList = {
  [key in AudioTrackId]: AudioTrack;
};

interface AudioStoreState {
  isLoad: boolean;
  isPlay: boolean;
  currentTime: number;
  tracks: AudioTrackList | null;
}

interface AudioStoreAction {
  initTracks: (urlList: { [key in AudioTrackId]: string }) => void;

  play: () => void;
  pause: () => void;
  stop: () => void;

  toggleMute: (trackId: AudioTrackId) => void;
  setVolume: (trackId: AudioTrackId, volume: number) => void;
}

export const useAudioStore = create<AudioStoreState & AudioStoreAction>((set, get) => ({
  isLoad: false,
  isPlay: false,
  currentTime: 0,
  tracks: null,

  initTracks: async (urlList: { [key in AudioTrackId]: string }) => {
    const prevTracks = get().tracks;

    // clean up
    if (prevTracks) {
      Object.values(prevTracks).forEach((track) => {
        if (track.player) track.player.dispose();
      });
    }

    const newTracks = Object.keys(urlList).reduce((acc, trackId) => {
      const trackUrl = urlList[trackId as AudioTrackId];
      const player = new Player({
        url: trackUrl,
        onload: () => console.log(`${trackId} is loaded`),
      }).toDestination();
      const track: AudioTrack = {
        player,
        isMuted: false,
        volume: 50,
      };
      return { ...acc, [trackId]: track };
    }, {}) as AudioTrackList;

    await loaded();

    set({ tracks: newTracks, isLoad: true });
  },

  // 모든 트랙 동시 재생
  play: async () => {
    const { tracks, currentTime, isLoad } = get();
    if (!tracks || !isLoad) return;
    if (getContext().state !== "running") {
      await start();
    }

    getTransport().start();

    Object.values(tracks).forEach((track) => {
      if (track.player && track.player.state !== "started") {
        track.player.sync().start(currentTime);
      }
    });

    set({ isPlay: true });
  },

  pause: () => {
    const { tracks, isLoad } = get();
    if (!tracks || !isLoad) return;

    const transport = getTransport();

    transport.pause();
    const currentTime = transport.seconds;

    set({ isPlay: false, currentTime });
  },

  // 모든 트랙 정지
  stop: () => {
    const { tracks, isLoad } = get();
    if (!tracks || !isLoad) return;

    getTransport().stop();

    Object.values(tracks).forEach((track) => {
      if (track.player) {
        track.player.unsync();
        track.player.stop();
      }
    });

    set({ isPlay: false, currentTime: 0 });
  },

  toggleMute: (trackId: AudioTrackId) => {
    const { tracks, isLoad } = get();
    if (!tracks || !isLoad) return;

    const newisMuted = !tracks[trackId].isMuted;
    tracks[trackId].isMuted = newisMuted;
    tracks[trackId].player.mute = newisMuted;

    set({ tracks: { ...tracks } });
  },

  setVolume: (trackId: AudioTrackId, volume: number) => {
    const { tracks, isLoad } = get();
    if (!tracks || !isLoad) return;

    // sliderValue 범위 : 0~100, 0: 음소거, 50: 1배(기본값), 100: 2배
    const toDecibel = (sliderValue: number) => {
      if (sliderValue === 0) return -Infinity;
      if (sliderValue <= 50) return -60 + (sliderValue / 50) * 60;
      else return (sliderValue - 50) * (6 / 50);
    };

    tracks[trackId].volume = volume;
    tracks[trackId].player.volume.value = toDecibel(volume);

    set({ tracks: { ...tracks } });
  },
}));
