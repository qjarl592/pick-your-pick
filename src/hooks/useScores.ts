import { useQuery } from "@tanstack/react-query";

import { getMany } from "@/lib/actions";
import { ScoreSortOption, SortOrder, useScoreFilterStore } from "@/store/scoreFilterStore";

export function useScores(userId: string) {
  const { keyword, difficulty, sort } = useScoreFilterStore((state) => ({
    keyword: state.keyword,
    difficulty: state.difficulty,
    sort: state.sort,
  }));

  return useQuery({
    queryKey: ["scores", userId, keyword, difficulty, sort],
    queryFn: ({ queryKey }) => {
      const [_, userId, keyword, rawDifficulty, sort] = queryKey;
      const difficulty = (rawDifficulty as number[]).length > 0 ? rawDifficulty : [1, 2, 3, 4, 5];
      const { by, order } = sort as { by: ScoreSortOption; order: SortOrder };

      const orderBy = by !== "none" && order !== "none" ? { [by]: order } : undefined;

      return getMany("score", {
        where: {
          userId: userId as string,
          OR: [
            {
              title: {
                contains: keyword as string,
                mode: "insensitive",
              },
            },
            {
              artist: {
                contains: keyword as string,
                mode: "insensitive",
              },
            },
          ],
          difficulty: {
            in: difficulty as number[],
          },
        },
        orderBy,
      });
    },
    enabled: !!userId,
  });
}
