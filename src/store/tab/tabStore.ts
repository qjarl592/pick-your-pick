import { create } from "zustand";

interface TabStore {
  tempo: number;
  originTempo: number;
  isPlaying: boolean;
  setTempo: (param: number) => void;
  setOriginTempo: (param: number) => void;
  setIsPlaying: (param: boolean) => void;
}

const useTabStore = create<TabStore>((set) => ({
  tempo: 0,
  originTempo: 10,
  isPlaying: false,
  setTempo: (tempo: number) => set({ tempo }),
  setOriginTempo: (originTempo: number) => set({ originTempo }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
}));
export default useTabStore;
