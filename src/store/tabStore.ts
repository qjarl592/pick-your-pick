import { create } from "zustand";

interface tabStore {
  tempo: number | null;
  minTempo: number | null;
  maxTempo: number | null;
  originTempo: number | null;
  setTempo: (param: number) => void;
  setMinTempo: (param: number) => void;
  setMaxTempo: (param: number) => void;
  setOriginTempo: (param: number) => void;
}

const useTabStore = create<tabStore>((set) => ({
  tempo: null,
  minTempo: null,
  maxTempo: null,
  originTempo: null,
  setTempo: (tempo: number) => set({ tempo: tempo }),
  setMinTempo: (minTempo: number) => set({ minTempo: minTempo }),
  setMaxTempo: (maxTempo: number) => set({ maxTempo: maxTempo }),
  setOriginTempo: (originTempo: number) => set({ originTempo: originTempo }),
}));
export default useTabStore;
