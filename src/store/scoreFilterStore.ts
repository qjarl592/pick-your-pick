import { create } from "zustand";

export type ScoreSortOption = "none" | "difficulty" | "lastPracticeDate" | "createdAt";
export type SortOrder = "none" | "desc" | "asc";

interface ScoreFilterState {
  keyword: string;
  difficulty: number[];
  sort: {
    by: ScoreSortOption;
    order: SortOrder;
  };
}

interface ScoreFilterAction {
  setKeyword: (newKeyword: string) => void;
  addDifficulty: (added: number) => void;
  removeDifficulty: (removed: number) => void;
  clearDifficulty: () => void;
  setSortBy: (newSortBy: ScoreSortOption) => void;
  toggleSortOrder: () => void;
  clearSortOrder: () => void;
  clearFilter: () => void;
}

export const useScoreFilterStore = create<ScoreFilterState & ScoreFilterAction>((set, get) => ({
  keyword: "",
  difficulty: [],
  sort: {
    by: "none",
    order: "none",
  },
  setKeyword: (newKeyword: string) => set({ keyword: newKeyword }),
  addDifficulty: (added: number) => {
    const curDifficulty = get().difficulty;
    if (!curDifficulty.includes(added)) {
      set({
        difficulty: [...curDifficulty, added],
      });
    }
  },
  removeDifficulty: (removed: number) => {
    const curDifficulty = get().difficulty;
    set({
      difficulty: curDifficulty.filter((item) => item !== removed),
    });
  },
  clearDifficulty: () => set({ difficulty: [] }),
  setSortBy: (newSortBy: ScoreSortOption) => {
    const curSort = get().sort;
    set({
      sort: { ...curSort, by: newSortBy },
    });
  },
  toggleSortOrder: () => {
    const curSort = get().sort;
    const toggleOrder: SortOrder[] = ["none", "desc", "asc"];
    const curIdx = toggleOrder.indexOf(curSort.order);
    const newIdx = (curIdx + 1) % toggleOrder.length;
    const newOrder = toggleOrder[newIdx];
    set({
      sort: { ...curSort, order: newOrder },
    });
  },
  clearSortOrder: () => {
    const curSort = get().sort;
    set({
      sort: { ...curSort, order: "none" },
    });
  },
  clearFilter: () =>
    set({
      difficulty: [],
      sort: {
        by: "none",
        order: "none",
      },
    }),
}));
