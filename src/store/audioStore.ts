import { create } from "zustand";

export type AudioTrackId = "bass" | "drum" | "guitar" | "others" | "piano" | "vocal";

interface TrackSettings {
  isMuted: boolean;
  volume: number;
}

export type Tracks = Record<AudioTrackId, TrackSettings>;

interface AudioTrackStore {
  // 모든 트랙 공통 상태
  isPlaying: boolean;
  currentPosition: number;

  // 각 트랙
  tracks: Tracks;

  // 재생 상태 제어
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentPosition: (position: number) => void;
  resetPosition: () => void;

  // 트랙별 설정 제어
  setTrackVolume: (trackId: AudioTrackId, volume: number) => void;
  setTrackMute: (trackId: AudioTrackId) => void;
  setTrackMuteOthers: (trackId: AudioTrackId) => void;
}

// 트랙 설정 초기 상태
const initialTrackSettings: TrackSettings = {
  isMuted: false,
  volume: 1,
};

// 모든 트랙에 대한 초기 설정 생성
const createInitialTrackSettings = (): Tracks => {
  return {
    bass: { ...initialTrackSettings },
    drum: { ...initialTrackSettings },
    guitar: { ...initialTrackSettings },
    others: { ...initialTrackSettings },
    piano: { ...initialTrackSettings },
    vocal: { ...initialTrackSettings },
  };
};

const useAudioTrackStore = create<AudioTrackStore>((set) => ({
  // 모든 트랙의 공통 상태
  isPlaying: false,
  currentPosition: 0,

  // 각 트랙별 설정
  tracks: createInitialTrackSettings(),

  // 재생 상태 제어
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  setCurrentPosition: (position) => set({ currentPosition: position }),

  resetPosition: () => set({ currentPosition: 0 }),

  // 트랙별 설정 제어
  setTrackVolume: (trackId, volume) =>
    set((state) => ({
      tracks: {
        ...state.tracks,
        [trackId]: {
          ...state.tracks[trackId],
          volume: Math.max(0, Math.min(1, volume)),
        },
      },
    })),

  setTrackMute: (trackId) =>
    set((state) => ({
      tracks: {
        ...state.tracks,
        [trackId]: {
          ...state.tracks[trackId],
          isMuted: !state.tracks[trackId].isMuted,
        },
      },
    })),

  setTrackMuteOthers: (trackId: AudioTrackId) =>
    set((state) => ({
      tracks: Object.fromEntries(
        (Object.entries(state.tracks) as [AudioTrackId, TrackSettings][]).map(([id, track]) => [
          id,
          {
            ...track,
            isMuted: id !== trackId,
          },
        ])
      ) as Tracks,
    })),
}));

export default useAudioTrackStore;
