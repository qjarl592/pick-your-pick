import WavesurferPlayer from "@wavesurfer/react";
import { VolumeXIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import { useRecordStore } from "@/store/recordStore";

import { Toggle } from "../ui/toggle";

interface Props {
  title: string;
  audioUrl: string;
}

export default function WaveformTrack({ title, audioUrl }: Props) {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const { isPlay } = useRecordStore();

  const handleWsOnReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
  };

  useEffect(() => {
    if (wavesurfer === null) return;
    if (isPlay) wavesurfer.play();
    else wavesurfer.pause();
  }, [isPlay, wavesurfer]);

  const handleClickMute = (isPress: boolean) => {
    if (wavesurfer === null) return;
    wavesurfer.setMuted(isPress);
  };

  return (
    <div className="flex w-full gap-4">
      <div className="flex w-32 items-center justify-around rounded-lg border shadow-sm">
        <div className="text-sm">{title}</div>
        <Toggle className="size-6 border p-1" onPressedChange={handleClickMute}>
          <VolumeXIcon className="size-4" />
        </Toggle>
      </div>
      <div className="grow">
        <WavesurferPlayer
          height={70}
          waveColor="rgb(200, 0, 200)"
          progressColor="rgb(100, 0, 100)"
          url={audioUrl}
          normalize
          onReady={handleWsOnReady}
        />
      </div>
    </div>
  );
}
