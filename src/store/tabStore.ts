import { create } from "zustand";

interface tabStore {
  tempo: number;
  minTempo: number;
  maxTempo: number;
  originTempo: number;
  setTempo: (param: number) => void;
  setMinTempo: (param: number) => void;
  setMaxTempo: (param: number) => void;
  setOriginTempo: (param: number) => void;
}

const useTabStore = create<tabStore>((set) => ({
  tempo: 0,
  minTempo: 0,
  maxTempo: 0,
  originTempo: 10,
  setTempo: (tempo: number) => set({ tempo }),
  setMinTempo: (minTempo: number) => set({ minTempo }),
  setMaxTempo: (maxTempo: number) => set({ maxTempo }),
  setOriginTempo: (originTempo: number) => set({ originTempo }),
}));
export default useTabStore;
