import { Square } from "lucide-react";
import React from "react";
import { Player } from "tone";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAudioStore from "@/store/audioStore";

interface Props {
  playerRef: React.RefObject<Player | null>;
  className?: string;
}

export default function StopBtn({ playerRef, className }: Props) {
  const { setIsPlaying, setCurrentPosition } = useAudioStore();

  const handleClick = () => {
    if (!playerRef.current) return;

    playerRef.current.stop();
    setIsPlaying(false);
    setCurrentPosition(0);
  };

  return (
    <Button variant="outline" size="icon" className={cn("", className)} onClick={handleClick}>
      <Square />
    </Button>
  );
}
