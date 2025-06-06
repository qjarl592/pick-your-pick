"use client";

import { Score } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

import { getScoreUrl } from "@/lib/storage";
import { api } from "@/services/axios";

import ScoreViewer from "./ScoreViewer";

interface Props {
  scoreId: string;
}

export default function ScoreDataWrapper({ scoreId }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const { data, error, isLoading } = useQuery<Score, AxiosError>({
    queryKey: ["score"],
    queryFn: async () => {
      const res = await api.get<Score>(`/score/${scoreId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (error) {
    const status = error.response?.status;
    if (status === 400 || status === 404) {
      router.push("/score");
    } else {
      notFound();
    }
    return null;
  }

  const userId = session?.user?.id;

  if (!data || !userId) {
    return null;
  }

  // PDF URL 생성
  const pdfUrl = getScoreUrl(userId, scoreId);
  console.log(pdfUrl);

  return (
    <div>
      <ScoreViewer pdfUrl={pdfUrl} />
    </div>
  );
}
