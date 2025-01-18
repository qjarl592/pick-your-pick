"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notFound, useRouter } from "next/navigation";

import { api } from "@/services/axios";

interface Props {
  params: { slug: string };
}

// API 응답 타입 정의
interface Score {
  id: string;
  userId: string;
  // 다른 score 관련 필드들...
}

// API 에러 응답 타입 정의
interface ErrorResponse {
  error: string;
}

export default function Page({ params }: Props) {
  const router = useRouter();
  const { slug: scoreId } = params;

  const { data, error } = useQuery<{ data: Score }, AxiosError<ErrorResponse>>({
    queryKey: ["score"],
    queryFn: () => api.get<Score>(`/score/${scoreId}`),
  });

  if (error) {
    const status = error.response?.status;
    if (status === 400 || status === 404) {
      notFound();
    } else {
      router.push("/score");
    }
  }

  if (!data) return null;

  return <main className="flex min-h-screen items-center justify-center">{JSON.stringify(data.data)}</main>;
}
