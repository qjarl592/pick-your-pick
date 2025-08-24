import { ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  moveNext: () => void;
}

export default function MoveNextBtn({ className, moveNext }: Props) {
  return (
    <Button variant="outline" size="icon" className={cn("", className)} onClick={moveNext}>
      <ChevronRight />
    </Button>
  );
}
