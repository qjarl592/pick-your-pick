"use client";

import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FilterOption {
  value: string;
  label: ReactNode;
}

interface FilterProps {
  title: string;
  options: FilterOption[];
  onChange?: (values: string[]) => void;
}

export function Filter({ title, options, onChange }: FilterProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value: string) => {
    const newSelected = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div>
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
                <Checkbox checked={selected.includes(option.value)} />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.map((value) => {
            const option = options.find((opt) => opt.value === value);
            if (!option) return null;

            return (
              <Button key={value} variant="secondary" size="sm" onClick={() => handleToggle(value)}>
                {option.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
