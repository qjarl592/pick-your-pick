import { Pause, Play } from "lucide-react";
import React from "react";
import { Player } from "tone";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAudioStore from "@/store/audioStore";

interface Props {
  playerRef: React.RefObject<Player | null>;
  className?: string;
}

export default function PlayPauseBtn({ playerRef, className }: Props) {
  const { isPlaying, currentPosition, setIsPlaying, setCurrentPosition } = useAudioStore();

  const handleClick = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      // 일시정지: 현재 재생 위치를 저장하고 정지
      const position = playerRef.current.immediate();
      setCurrentPosition(position);
      playerRef.current.stop();
    } else {
      // 재생: 저장된 위치부터 재생 시작
      if (currentPosition > 0) {
        playerRef.current.start(undefined, currentPosition);
      } else {
        // 처음부터 재생
        playerRef.current.start();
      }
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <Button variant="outline" size="icon" className={cn("", className)} onClick={handleClick}>
      {!isPlaying ? <Play /> : <Pause />}
    </Button>
  );
}
