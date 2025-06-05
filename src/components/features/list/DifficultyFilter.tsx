import { Star } from "lucide-react";
import { nanoid } from "nanoid";

import { Filter } from "@/components/common/Filter";

export default function DifficultyFilter() {
  const renderStars = (count: number) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, index) => (
        <Star
          key={nanoid()}
          size={14}
          className={index < count ? "text-yellow-400" : "text-gray-300"}
          fill={index < count ? "currentColor" : "none"}
        />
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
