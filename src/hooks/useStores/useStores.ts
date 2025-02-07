import { getScoresByUserId } from "@/services/score";
import { useQuery } from "@tanstack/react-query";

export function useScores(userId: string) {
  return useQuery({
    queryKey: ["scores", userId],
    queryFn: () => getScoresByUserId(userId),
    enabled: !!userId,
  });
}
