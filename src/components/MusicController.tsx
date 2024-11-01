"use client";

import { PauseIcon, PlayIcon, RepeatIcon, SquareIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import TempoSlider from "@/components//TempoSlider";
import { Button } from "@/components/ui/button";
import useTabStore from "@/store/tab/tabStore";

interface Props {
  fileUrl: string;
}

export default function MusicController(props: Props) {
  const { fileUrl } = props;
  const { originTempo, isPlaying, setIsPlaying } = useTabStore();
  const [tempo, setTempo] = useState(originTempo);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.preservesPitch = true;
    audioRef.current.playbackRate = tempo / originTempo;
  }, [originTempo, tempo]);

  const handleClickPlay = () => {
    if (!audioRef.current) return;
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.preservesPitch = true;
      audioRef.current.play();
    }
  };

  const handleClickStop = () => {
    if (!audioRef.current) return;
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-screen space-x-2 rounded-xl border-2 bg-white p-2">
      <audio ref={audioRef} src={fileUrl} />
      <Button variant="outline" className="size-16" onClick={handleClickPlay}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Button variant="outline" className="size-16" onClick={handleClickStop}>
        <SquareIcon />
      </Button>
      <TempoSlider tempo={tempo} setTempo={setTempo} />
      <Button variant="outline" className="flex h-16 w-24 flex-col items-center justify-center">
        <RepeatIcon />
        <span className="text-xs text-muted-foreground">Loop</span>
      </Button>
    </div>
  );
}
