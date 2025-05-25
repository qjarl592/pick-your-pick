"use client";

import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScoreSortOption, useScoreFilterStore } from "@/store/scoreFilterStore";

const selectOptions: { value: ScoreSortOption; title: string }[] = [
  {
    value: "difficulty",
    title: "난이도 순",
  },
  {
    value: "lastPracticeDate",
    title: "마지막 연습일자 순",
  },
  {
    value: "createdAt",
    title: "등록일자 순",
  },
];

export default function SortSelector() {
  const { sort, setSortBy, toggleSortOrder, clearSortOrder } = useScoreFilterStore((state) => ({
    sort: state.sort,
    setSortBy: state.setSortBy,
    toggleSortOrder: state.toggleSortOrder,
    clearSortOrder: state.clearSortOrder,
  }));
  const { by, order } = sort;

  return (
    <div className="flex items-center gap-1">
      <Select
        value={by === "none" ? "" : by}
        onValueChange={(newValue) => {
          setSortBy(newValue as ScoreSortOption);
          clearSortOrder();
        }}
      >
        <SelectTrigger className="w-[150px] rounded-lg border-blue-100 bg-white text-gray-700 shadow-sm hover:border-blue-300 focus:ring-blue-200">
          <SelectValue placeholder="정렬 기준 선택" />
        </SelectTrigger>
        <SelectContent className="rounded-lg border-blue-100 bg-white shadow-lg">
          <SelectGroup>
            {selectOptions.map((item) => (
              <SelectItem
                value={item.value}
                key={`select_${item.value}`}
                className="text-gray-700 hover:bg-blue-50 focus:bg-blue-50"
              >
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleSortOrder}
        className="size-10 rounded-lg border-blue-100 bg-white text-blue-600 shadow-sm hover:bg-blue-50 hover:text-blue-700"
      >
        {order === "none" ? (
          <ArrowDownUp className="size-4" />
        ) : (
          <>{order === "desc" ? <ArrowDown className="size-4" /> : <ArrowUp className="size-4" />}</>
        )}
      </Button>
    </div>
  );
}
