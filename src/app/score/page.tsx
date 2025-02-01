import { nanoid } from "nanoid";

import ScoreCard from "@/components/features/list/ScoreCard";
import ScoreListCarousel from "@/components/features/list/ScoreListCarousel";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      list
      <ScoreListCarousel>
        {Array.from({ length: 25 }).map((_) => (
          <ScoreCard key={nanoid()} />
        ))}
      </ScoreListCarousel>
    </main>
  );
}
