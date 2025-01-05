import { create } from "zustand";

interface TabState {
  tempo: number;
  originTempo: number;
  isPlay: boolean;
}

interface TabAction {
  initTab: (param: Omit<TabState, "isPlay">) => void;
  setIsPlay: (isPlay: boolean) => void;
  setTempo: (tempo: number) => void;
}

const useTabStore = create<TabState & TabAction>((set) => ({
  tempo: 0,
  originTempo: 0,
  isPlay: false,
  initTab: ({ tempo, originTempo }) => set({ tempo, originTempo }),
  setIsPlay: (isPlay) => set({ isPlay }),
  setTempo: (tempo: number) => set({ tempo }),
}));
export default useTabStore;
