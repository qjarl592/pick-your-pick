"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DrumIcon,
  Minus,
  PauseIcon,
  PlayIcon,
  Plus,
  RepeatIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "./ui/slider";
import TempoSlider from "./TempoSlider";

type Props = {
  defaultTempo: number;
  audioUrl: string;
};

export default function MusicController(props: Props) {
  const { defaultTempo, audioUrl } = props;
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(
    null
  );
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [tempo, setTempo] = useState(defaultTempo);

  useEffect(() => {
    if (audioCtx) return;
    (async () => {
      await loadContext();
    })();
  }, []);

  useEffect(() => {
    if (!sourceNode) return;
    const playbackRate = tempo / defaultTempo;
    sourceNode.playbackRate.value = playbackRate;
  }, [tempo]);

  const loadContext = async () => {
    const context = new window.AudioContext();
    setAudioCtx(context);

    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const decodedBuffer = await context.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedBuffer);
      setIsReady(true);
      console.log("ready");
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const play = () => {
    if (!audioCtx || !audioBuffer) return;

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    const playbackRate = tempo / defaultTempo;
    source.playbackRate.value = playbackRate;
    source.connect(audioCtx.destination);
    source.start();

    setSourceNode(source);
    setIsPlay(true);

    source.onended = () => {
      setIsPlay(false);
    };
  };

  const pause = () => {
    if (!sourceNode) return;
    sourceNode.stop();
    setSourceNode(null);
    setIsPlay(false);
  };

  const togglePlay = () => {
    if (isPlay) pause();
    else play();
  };

  return (
    <div className="flex space-x-2 p-2 border-2 rounded-xl">
      <Button
        variant="outline"
        className="h-16 w-16"
        disabled={!isReady}
        onClick={togglePlay}
      >
        {isPlay ? <PauseIcon /> : <PlayIcon />}
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
