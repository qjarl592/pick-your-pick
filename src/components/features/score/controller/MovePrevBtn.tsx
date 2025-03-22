import { ChevronLeft } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  movePrev: () => void;
}

export default function MovePrevBtn({ className, movePrev }: Props) {
  return (
    <Button variant="outline" size="icon" className={cn("", className)} onClick={movePrev}>
      <ChevronLeft />
    </Button>
  );
}
