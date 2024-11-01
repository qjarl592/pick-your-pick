"use client";

import { PauseIcon, PlayIcon, RepeatIcon, SquareIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import TempoSlider from "@/components//TempoSlider";
import { Button } from "@/components/ui/button";
import useTabStore from "@/store/tabStore";

type Props = {
  fileUrl: string;
  playPauseTab: () => void;
  stopTab: () => void;
};

export default function MusicController(props: Props) {
  const { fileUrl, playPauseTab, stopTab } = props;
  const { originTempo } = useTabStore();
  const [isPlay, setIsPlay] = useState(false);
  const [tempo, setTempo] = useState(originTempo);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    const playbackRate = tempo / originTempo;
    audioRef.current.preservesPitch = true;
    audioRef.current.playbackRate = playbackRate;
  }, [originTempo, tempo]);

  const handleClickPlay = () => {
    if (!audioRef.current) return;
    setIsPlay(!isPlay);
    playPauseTab();
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.preservesPitch = true;
      audioRef.current.play();
    }
  };

  const handleClickStop = () => {
    if (!audioRef.current) return;
    setIsPlay(false);
    stopTab();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="flex space-x-2 rounded-xl border-2 p-2">
      <audio ref={audioRef} src={fileUrl} />
      <Button variant="outline" className="size-16" onClick={handleClickPlay}>
        {isPlay ? <PauseIcon /> : <PlayIcon />}
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
