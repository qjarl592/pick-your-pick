import { Square } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAudioStore } from "@/store/audioStore";

interface Props {
  className?: string;
}

export default function StopBtn({ className }: Props) {
  const { isload, stop } = useAudioStore();
  return (
    <Button variant="outline" size="icon" className={cn("", className)} onClick={stop} disabled={!isload}>
      <Square />
    </Button>
  );
}
