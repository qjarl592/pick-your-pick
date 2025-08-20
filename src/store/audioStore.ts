import { getContext, getTransport, loaded, Player, start, Synth, Loop } from "tone";
import { create } from "zustand";

export type AudioTrackId = "bass" | "drum" | "guitar" | "others" | "piano" | "vocal";

interface AudioTrack {
  player: Player;
  isMuted: boolean;
  volume: number;
  src: string;
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
  playbackSpeed: number;

  // Only one metronome state
  isMetronomeOn: boolean;

  _rafId: number | null;
  _startTime: number | null;
  _pausedTime: number;
  _metronomeSynth: Synth | null;
  _metronomeLoop: Loop | null;
  currentBPM: number;
}

interface AudioStoreAction {
  initTracks: (urlList: { [key in AudioTrackId]: string }) => Promise<void>;

  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (targetTime: number) => void;

  toggleMute: (trackId: AudioTrackId) => void;
  setVolume: (trackId: AudioTrackId, volume: number) => void;
  setPlaybackSpeed: (speed: number) => void;

  // Metronome actions
  toggleMetronome: (isOn: boolean) => void;
  setBPM: (bpm: number) => void;

  _updateRaf: () => void;
  _cancelRaf: () => void;
}

export const useAudioStore = create<AudioStoreState & AudioStoreAction>((set, get) => ({
  isLoad: false,
  isPlay: false,
  currentTime: 0,
  duration: 0,
  tracks: null,
  playbackSpeed: 1,

  // Only metronome on/off state
  isMetronomeOn: false,
  currentBPM: 0,

  _rafId: null,
  _startTime: null,
  _pausedTime: 0,
  _metronomeSynth: null,
  _metronomeLoop: null,

  initTracks: async (urlList: { [key in AudioTrackId]: string }) => {
    const prevTracks = get().tracks;

    // clean up
    get()._cancelRaf();

    if (prevTracks) {
      Object.values(prevTracks).forEach((track) => {
        if (track.player) track.player.dispose();
      });
    }

    // Initialize metronome if not already done
    const state = get();
    if (!state._metronomeSynth) {
      const synth = new Synth().toDestination();
      synth.volume.value = -10; // Default metronome volume

      const loop = new Loop((time) => {
        synth.triggerAttackRelease("C6", "8n", time);
      }, "4n");

      set({
        _metronomeSynth: synth,
        _metronomeLoop: loop,
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
        src: trackUrl,
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

    set({
      tracks: newTracks,
      isLoad: true,
      duration: maxDuration,
      isPlay: false,
      currentTime: 0,
      _pausedTime: 0,
      _startTime: null,
    });
  },

  _updateRaf: () => {
    const state = get();
    if (!state.isPlay || state._startTime === null) return;

    const now = Date.now();
    const elapsedTime = (now - state._startTime) / 1000;
    const scaledElapsedTime = elapsedTime * state.playbackSpeed;
    const currentTime = state._pausedTime + scaledElapsedTime;

    set({ currentTime });

    if (currentTime >= state.duration) {
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

    // Set BPM for metronome
    transport.bpm.value = state.currentBPM * state.playbackSpeed;

    // Start metronome if enabled
    if (state.isMetronomeOn && state._metronomeLoop) {
      state._metronomeLoop.start(0);
      transport.start();
    }

    // Set start time for accurate time tracking
    set({ _startTime: Date.now() });

    // Start all tracks from the current time position
    Object.values(state.tracks).forEach((track) => {
      if (track.player) {
        track.player.stop();
        track.player.playbackRate = state.playbackSpeed;
        track.player.start(0, state.currentTime / state.playbackSpeed);
      }
    });

    get()._cancelRaf();
    set({ isPlay: true });
    get()._updateRaf();
  },

  pause: () => {
    const { tracks, isLoad, currentTime, _metronomeLoop } = get();
    if (!tracks || !isLoad) return;

    // Pause metronome
    const transport = getTransport();
    transport.pause();

    if (_metronomeLoop) {
      _metronomeLoop.stop();
    }

    // Stop all tracks
    Object.values(tracks).forEach((track) => {
      if (track.player) {
        track.player.stop();
      }
    });

    get()._cancelRaf();
    set({
      isPlay: false,
      _pausedTime: currentTime,
      _startTime: null,
    });
  },

  stop: () => {
    const { tracks, isLoad, _metronomeLoop } = get();
    if (!tracks || !isLoad) return;

    const transport = getTransport();
    transport.stop();

    if (_metronomeLoop) {
      _metronomeLoop.stop();
    }

    Object.values(tracks).forEach((track) => {
      if (track.player) {
        track.player.stop();
      }
    });

    get()._cancelRaf();
    set({
      isPlay: false,
      currentTime: 0,
      _pausedTime: 0,
      _startTime: null,
    });
  },

  seek: (targetTime: number) => {
    const state = get();
    if (!state.tracks || !state.isLoad) return;

    const validTime = Math.max(0, Math.min(targetTime, state.duration));

    if (state.isPlay) {
      get().pause();
      set({
        currentTime: validTime,
        _pausedTime: validTime,
      });
      get().play();
    } else {
      set({
        currentTime: validTime,
        _pausedTime: validTime,
      });
    }
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

    const toDecibel = (sliderValue: number) => {
      if (sliderValue === 0) return -Infinity;
      if (sliderValue <= 50) return -60 + (sliderValue / 50) * 60;
      else return (sliderValue - 50) * (6 / 50);
    };

    tracks[trackId].volume = volume;
    tracks[trackId].player.volume.value = toDecibel(volume);

    set({ tracks: { ...tracks } });
  },

  setPlaybackSpeed: (speed: number) => {
    const state = get();
    if (!state.tracks || !state.isLoad) return;

    const validSpeed = Math.max(0.25, Math.min(speed, 2.0));

    if (state.isPlay) {
      const currentTime = state.currentTime;

      get().pause();
      set({ playbackSpeed: validSpeed });
      set({
        currentTime: currentTime,
        _pausedTime: currentTime,
      });
      get().play();
    } else {
      set({ playbackSpeed: validSpeed });
    }
  },

  // Separate BPM control function
  setBPM: (bpm: number) => {
    const state = get();

    set({ currentBPM: bpm });

    // Update transport BPM if metronome is on and playing
    if (state.isMetronomeOn || state.isPlay) {
      const transport = getTransport();
      transport.bpm.value = bpm * state.playbackSpeed;
    }
  },

  // Simplified metronome toggle function (only handles on/off)
  toggleMetronome: (isOn: boolean) => {
    const state = get();

    if (!state._metronomeSynth || !state._metronomeLoop) return;

    // Handle metronome toggle
    if (state.isPlay) {
      const transport = getTransport();

      if (isOn) {
        // Turn on metronome
        transport.bpm.value = state.currentBPM * state.playbackSpeed;
        state._metronomeLoop.start(0);
        transport.start();
      } else {
        // Turn off metronome
        state._metronomeLoop.stop();
        transport.stop();
      }
    }

    set({ isMetronomeOn: isOn });
  },
}));
