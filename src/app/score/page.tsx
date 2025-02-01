import { nanoid } from "nanoid";

import DifficultyFilter from "@/components/features/list/DifficultyFilter";
import RecordingFilter from "@/components/features/list/RecordingFilter";
import ScoreCard from "@/components/features/list/ScoreCard";
import ScoreListCarousel from "@/components/features/list/ScoreListCarousel";
import SearchBar from "@/components/features/list/SearchBar";
import SortSelector from "@/components/features/list/SortSelector";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <SearchBar />
      <SortSelector />
      <DifficultyFilter />
      <RecordingFilter />
      <ScoreListCarousel>
        {Array.from({ length: 25 }).map((_) => (
          <ScoreCard key={nanoid()} />
        ))}
      </ScoreListCarousel>
    </main>
  );
}
