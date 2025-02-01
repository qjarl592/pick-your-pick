"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortSelector() {
  const [sortDirection, setSortDirection] = useState("desc");

  const toggleDirection = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="flex items-center gap-2">
      <Select defaultValue="difficulty">
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="정렬 기준 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="difficulty">난이도 순</SelectItem>
            <SelectItem value="lastPracticed">마지막 연습일자 순</SelectItem>
            <SelectItem value="createdAt">등록일자 순</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon" onClick={toggleDirection} className="size-10">
        {sortDirection === "desc" ? <ArrowDown className="size-4" /> : <ArrowUp className="size-4" />}
      </Button>
    </div>
  );
}
