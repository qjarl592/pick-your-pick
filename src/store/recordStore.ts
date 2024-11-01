import { create } from "zustand";

interface RecordStore {
  isPlay: boolean;
  setIsPlay: (value: boolean) => void;
}

export const useRecordStore = create<RecordStore>((set) => ({
  isPlay: false,
  setIsPlay: (value: boolean) => set({ isPlay: value }),
}));
