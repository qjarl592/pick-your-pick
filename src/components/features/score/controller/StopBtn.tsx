import { Square } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function StopBtn({ className }: Props) {
  return (
    <Button variant="outline" size="icon" className={cn("", className)}>
      <Square />
    </Button>
  );
}
