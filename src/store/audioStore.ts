import { create } from "zustand";

interface AudioState {
  isPlaying: boolean;
  currentPosition: number;
}

interface AudioAction {
  setIsPlaying: (isPlay: boolean) => void;
  setCurrentPosition: (currentPosition: number) => void;
}

const useAudioStore = create<AudioState & AudioAction>((set) => ({
  isPlaying: false,
  currentPosition: 0,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
}));
export default useAudioStore;
