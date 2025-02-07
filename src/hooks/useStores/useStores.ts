import { useQuery } from "@tanstack/react-query";

import { getScoresByUserId } from "@/services/score";

export function useScores(userId: string) {
  return useQuery({
    queryKey: ["scores", userId],
    queryFn: () => getScoresByUserId(userId),
    enabled: !!userId,
  });
}
