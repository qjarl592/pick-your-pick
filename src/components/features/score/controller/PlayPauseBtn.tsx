import { Pause, Play } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAudioStore } from "@/store/audioStore";

interface Props {
  className?: string;
}

export default function PlayPauseBtn({ className }: Props) {
  const { isload, isPlay, play, pause } = useAudioStore();

  const togglePlayPause = () => {
    if (isPlay) {
      pause();
    } else {
      play();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("", className)}
      onClick={togglePlayPause}
      disabled={!isload}
    >
      {!isPlay ? <Play /> : <Pause />}
    </Button>
  );
}
