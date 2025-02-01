import { Star } from "lucide-react";
import { nanoid } from "nanoid";

import { Filter } from "@/components/common/FilterTemp";

export default function DifficultyFilter() {
  const renderStars = (count: number) => (
    <div className="flex gap-0.5">
      {[...Array(count)].map(() => (
        <Star key={nanoid()} size={14} className="text-yellow-300" fill="currentColor" />
      ))}
    </div>
  );

  const options = [
    { value: "1", label: renderStars(1) },
    { value: "2", label: renderStars(2) },
    { value: "3", label: renderStars(3) },
    { value: "4", label: renderStars(4) },
    { value: "5", label: renderStars(5) },
  ];

  return <Filter title="난이도" options={options} />;
}
