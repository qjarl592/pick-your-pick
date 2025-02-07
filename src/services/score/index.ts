import { Score } from "@prisma/client";

import { api } from "../axios";

export const getScoresByUserId = async (userId: string) => {
  const { data } = await api.get<Score[]>(`/score`, {
    params: { userId },
  });
  return data;
};
