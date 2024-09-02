"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  Square,
  SquareIcon,
} from "lucide-react";
import TempoSlider from "./TempoSlider";

type Props = {
  defaultTempo: number;
  audioUrl: string;
  togglePlayPauseTab: () => void;
  stopWithResetTab: () => void;
};

export default function MusicController(props: Props) {
  const { defaultTempo, audioUrl, togglePlayPauseTab, stopWithResetTab } =
    props;
  const [isPlay, setIsPlay] = useState(false);
  const [tempo, setTempo] = useState(defaultTempo);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    const playbackRate = tempo / defaultTempo;
    audioRef.current.preservesPitch = true;
    audioRef.current.playbackRate = playbackRate;
  }, [tempo]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setIsPlay(!isPlay);
    togglePlayPauseTab();
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.preservesPitch = true;
      audioRef.current.play();
    }
  };

  const stopWithReset = () => {
    if (!audioRef.current) return;
    setIsPlay(false);
    stopWithResetTab();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="flex space-x-2 p-2 border-2 rounded-xl">
      <audio ref={audioRef} src={audioUrl} />
      <Button variant="outline" className="h-16 w-16" onClick={togglePlay}>
        {isPlay ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Button variant="outline" className="h-16 w-16" onClick={stopWithReset}>
        <SquareIcon />
      </Button>
      <TempoSlider
        defaultTempo={defaultTempo}
        tempo={tempo}
        setTempo={setTempo}
      />
      <Button
        variant="outline"
        className="flex flex-col justify-center items-center h-16 w-24"
      >
        <RepeatIcon />
        <span className="text-xs text-muted-foreground">Loop</span>
      </Button>
    </div>
  );
}
