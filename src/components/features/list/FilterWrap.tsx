import DifficultyFilter from "./DifficultyFilter";
import RecordingFilter from "./RecordingFilter";
import RefreshFilter from "./RefreshFilter";
import SortSelector from "./SortSelector";

export default function FilterWrap() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <DifficultyFilter />
      <div className="flex items-center gap-4">
        <RecordingFilter />
        <SortSelector />
        <RefreshFilter />
      </div>
    </div>
  );
}
