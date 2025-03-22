import { Pause, Play } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

export default function PlayPauseBtn({ className, isPlaying, togglePlayPause }: Props) {
  return (
    <Button variant="outline" size="icon" className={cn("", className)} onClick={togglePlayPause}>
      {!isPlaying ? <Play /> : <Pause />}
    </Button>
  );
}
