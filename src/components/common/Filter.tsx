"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
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
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-blue-100 bg-white text-gray-700 shadow-sm hover:bg-blue-50 hover:text-blue-700"
          >
            <span>{title}</span>
            <Plus className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full rounded-lg border border-blue-100 bg-white p-2 shadow-lg"
          align="start"
        >
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex cursor-pointer items-center space-x-2 rounded-md p-2 transition-colors hover:bg-blue-50"
                onClick={() => handleToggle(option.value)}
              >
                <Checkbox
                  checked={difficulty.includes(Number(option.value))}
                  className="border-blue-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <AnimatePresence>
        {difficulty.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {difficulty.map((value) => {
              const option = options.find((opt) => opt.value === value.toString());
              if (!option) return null;

              return (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => removeDifficulty(value)}
                    className="h-8 rounded-full border border-blue-200 bg-blue-100 py-0 pl-2 pr-1 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                  >
                    {option.label}
                    <X className="ml-1 size-3" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
