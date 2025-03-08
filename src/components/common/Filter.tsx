"use client";

import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useScoreFilterStore } from "@/store/scoreFilterStore";

interface FilterOption {
  value: string;
  label: ReactNode;
}

interface FilterProps {
  title: string;
  options: FilterOption[];
  onChange?: (values: string[]) => void;
}

export function Filter({ title, options }: FilterProps) {
  const { difficulty, addDifficulty, removeDifficulty } = useScoreFilterStore((state) => ({
    difficulty: state.difficulty,
    addDifficulty: state.addDifficulty,
    removeDifficulty: state.removeDifficulty,
  }));
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value: string) => {
    if (Number.isNaN(Number(value))) return;
    addDifficulty(Number(value));
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <span>{title}</span>
            <Plus className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2" align="start">
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex cursor-pointer items-center space-x-2 rounded p-1 hover:bg-gray-100"
                onClick={() => handleToggle(option.value)}
              >
                <Checkbox checked={difficulty.includes(Number(option.value))} />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {difficulty.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {difficulty.map((value) => {
            const option = options.find((opt) => opt.value === value.toString());
            if (!option) return null;

            return (
              <Button key={value} variant="secondary" size="sm" onClick={() => removeDifficulty(value)}>
                {option.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
