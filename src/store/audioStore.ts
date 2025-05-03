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
  duration: number;
  tracks: AudioTrackList | null;

  _rafId: number | null; // for tracking requestAnimationFrame
}

interface AudioStoreAction {
  initTracks: (urlList: { [key in AudioTrackId]: string }) => void;

  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (targetTime: number) => void;

  toggleMute: (trackId: AudioTrackId) => void;
  setVolume: (trackId: AudioTrackId, volume: number) => void;

  // for animation frame updates
  _updateRaf: () => void;
  _cancelRaf: () => void;
}

export const useAudioStore = create<AudioStoreState & AudioStoreAction>((set, get) => ({
  isLoad: false,
  isPlay: false,
  currentTime: 0,
  duration: 0,
  tracks: null,
  _rafId: null,

  initTracks: async (urlList: { [key in AudioTrackId]: string }) => {
    const prevTracks = get().tracks;

    // clean up
    get()._cancelRaf();

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

    const maxDuration = Object.values(newTracks).reduce((max, track) => {
      if (track.player.buffer) {
        const trackDuration = track.player.buffer.duration;
        return Math.max(max, trackDuration);
      } else return max;
    }, 0);

    set({ tracks: newTracks, isLoad: true, duration: maxDuration, isPlay: false, currentTime: 0 });
  },

  // for animation frame updates
  _updateRaf: () => {
    const state = get();
    if (!state.isPlay) return;

    const transport = getTransport();
    const currentSeconds = transport.seconds;

    set({ currentTime: currentSeconds });

    if (currentSeconds >= state.duration) {
      get().stop();
      return;
    }

    const rafId = requestAnimationFrame(() => get()._updateRaf());
    set({ _rafId: rafId });
  },

  _cancelRaf: () => {
    const { _rafId } = get();

    if (_rafId !== null) {
      cancelAnimationFrame(_rafId);
      set({ _rafId: null });
    }
  },

  play: async () => {
    const state = get();
    if (!state.tracks || !state.isLoad) return;
    if (getContext().state !== "running") {
      await start();
    }

    const transport = getTransport();
    transport.stop();
    transport.seconds = state.currentTime;
    transport.start();

    Object.values(state.tracks).forEach((track) => {
      if (track.player) {
        track.player.stop();
        track.player.unsync();
        track.player.sync().start(0);
      }
    });

    get()._cancelRaf();
    set({ isPlay: true });
    get()._updateRaf();
  },

  pause: () => {
    const { tracks, isLoad } = get();
    if (!tracks || !isLoad) return;

    const transport = getTransport();

    transport.pause();
    const currentTime = transport.seconds;

    Object.values(tracks).forEach((track) => {
      if (track.player) {
        track.player.unsync();
      }
    });

    get()._cancelRaf();
    set({ isPlay: false, currentTime });
  },

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

    get()._cancelRaf();
    set({ isPlay: false, currentTime: 0 });
  },

  seek: (targetTime: number) => {
    const state = get();
    if (!state.tracks || !state.isLoad) return;

    const validTime = Math.max(0, Math.min(targetTime, state.duration));
    const transport = getTransport();

    transport.seconds = validTime;

    if (state.isPlay) {
      get()._cancelRaf();
      transport.stop();
      transport.seconds = validTime;
      transport.start();

      Object.values(state.tracks).forEach((track) => {
        if (track.player) {
          track.player.stop();
          track.player.unsync();
          track.player.sync().start(0);
        }
      });

      get()._updateRaf();
    }

    set({ currentTime: validTime });
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
