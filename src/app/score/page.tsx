"use client";

import { nanoid } from "nanoid";

import DifficultyFilter from "@/components/features/list/DifficultyFilter";
import RecordingFilter from "@/components/features/list/RecordingFilter";
import ScoreCard from "@/components/features/list/ScoreCard";
import ScoreListCarousel from "@/components/features/list/ScoreListCarousel";
import SearchBar from "@/components/features/list/SearchBar";
import SortSelector from "@/components/features/list/SortSelector";
import { useSession } from "next-auth/react";
import { useScores } from "@/hooks/useStores/useStores";

export default function Page() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: scores, isLoading, error } = useScores(session?.user?.id || "");

  if (sessionStatus === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading scores</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <SearchBar />
      <SortSelector />
      <DifficultyFilter />
      <RecordingFilter />
      <ScoreListCarousel>
        {scores?.map((score) => <ScoreCard key={nanoid()} score={score} />)}
      </ScoreListCarousel>
    </main>
  );
}
