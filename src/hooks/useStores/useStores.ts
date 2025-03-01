import { useQuery } from "@tanstack/react-query";

import { getMany } from "@/app/actions";

export function useScores(userId: string) {
  return useQuery({
    queryKey: ["scores", userId],
    queryFn: () =>
      getMany("score", {
        where: {
          userId: userId,
        },
      }),
    enabled: !!userId,
  });
}
