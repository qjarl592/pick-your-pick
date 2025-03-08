"use client";

import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";

import Logo from "@/components/common/Logo";
import FilterWrap from "@/components/features/list/FilterWrap";
import ScoreCard from "@/components/features/list/ScoreCard";
import ScoreListCarousel from "@/components/features/list/ScoreListCarousel";
import SearchBar from "@/components/features/list/SearchBar";
import { useScores } from "@/hooks/useStores/useStores";

export default function Page() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: scores, isLoading } = useScores(session?.user?.id || "");

  if (sessionStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="flex w-full flex-col items-center gap-6 p-20">
        <Logo size="lg" />

        <SearchBar />

        <FilterWrap />

        {scores ? (
          <ScoreListCarousel>
            {scores.data?.map((score) => <ScoreCard key={nanoid()} score={score} />)}
          </ScoreListCarousel>
        ) : (
          <div>{isLoading ? "loading..." : "error"}</div>
        )}
      </div>
    </main>
  );
}
