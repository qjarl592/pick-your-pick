"use client";

import { Score } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { notFound, useRouter } from "next/navigation";
import React from "react";

import { api } from "@/services/axios";

interface Props {
  scoreId: string;
}

export default function ScoreDataWrapper({ scoreId }: Props) {
  const router = useRouter();

  const { data, error, isLoading } = useQuery<AxiosResponse<Score>, AxiosError>({
    queryKey: ["score"],
    queryFn: () => api.get<Score>(`/score/${scoreId}`),
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    const status = error.response?.status;
    if (status === 400 || status === 404) {
      notFound();
    } else {
      router.push("/score");
    }
    return;
  }

  if (!data) return null;

  return <div>{JSON.stringify(data.data)}</div>;
}
