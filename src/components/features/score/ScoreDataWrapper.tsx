"use client";

import { Score } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import React from "react";

import { checkIsDev } from "@/lib/utils";
import { api } from "@/services/axios";

import ScoreViewer from "./ScoreViewer";

interface Props {
  scoreId: string;
}

export default function ScoreDataWrapper({ scoreId }: Props) {
  const router = useRouter();

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

  if (!data || !data.pdfUrl) return null;

  const { pdfUrl } = data;

  //tmp
  const tmpPdfUrl = checkIsDev() ? "/sample/score/sample_score.pdf" : pdfUrl;

  return (
    <div>
      <ScoreViewer pdfUrl={tmpPdfUrl} />
    </div>
  );
}
