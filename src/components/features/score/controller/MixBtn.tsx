import { AudioLines } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function MixBtn({ className }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("", className)}>
          <AudioLines />
          <span className="ml-2">믹싱</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">mix</PopoverContent>
    </Popover>
  );
}
