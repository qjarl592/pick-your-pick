import { Square } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  toggleStop: () => void;
}

export default function StopBtn({ className, toggleStop }: Props) {
  return (
    <Button variant="outline" size="icon" className={cn("", className)} onClick={toggleStop}>
      <Square />
    </Button>
  );
}
