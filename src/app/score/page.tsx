import DifficultyFilter from "@/components/features/list/DifficultyFilter";
import RecordingFilter from "@/components/features/list/RecordingFilter";
import SearchBar from "@/components/features/list/SearchBar";
import SortSelector from "@/components/features/list/SortSelector";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SearchBar />
      <SortSelector />
      <DifficultyFilter />
      <RecordingFilter />
    </main>
  );
}
