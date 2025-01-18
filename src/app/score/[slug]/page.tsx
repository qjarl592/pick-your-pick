"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/axios";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const { slug: scoreId } = params;
  const { data } = useQuery({
    queryKey: ["score"],
    queryFn: () => api.get(`/score/${scoreId}`),
  });
  console.log("data", data);

  return <main className="flex min-h-screen items-center justify-center">detail</main>;
}
