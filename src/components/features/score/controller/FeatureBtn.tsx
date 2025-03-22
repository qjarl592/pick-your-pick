import { Wrench } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function FeatureBtn({ className }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("", className)}>
          <Wrench />
          <span className="ml-2">제어</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">mix</PopoverContent>
    </Popover>
  );
}
