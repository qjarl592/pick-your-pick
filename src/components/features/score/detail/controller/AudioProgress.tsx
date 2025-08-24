import React from "react";

import { Slider } from "@/components/ui/slider";
import { useAudioStore } from "@/store/audioStore";

const formatTime = (secUnit: number) => {
  const min = Math.floor(secUnit / 60);
  const sec = Math.round(secUnit - min * 60);

  const minStr = min.toString();
  const secStr = sec < 10 ? `0${sec}` : sec.toString();

  return minStr + ":" + secStr;
};

export default function AudioProgress() {
  const { isLoad, currentTime, duration, seek } = useAudioStore();

  const handleSliderChange = (values: number[]) => {
    const targetTime = values[0];
    seek(targetTime);
  };

  return (
    <div className="flex h-10 flex-1 items-center rounded-md border border-input bg-background px-2">
      <div className="mt-3 w-full">
        <Slider
          step={0.1}
          disabled={!isLoad}
          min={0}
          max={duration}
          value={[currentTime]}
          onValueChange={handleSliderChange}
        />
        <span className="text-xs">{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>
      </div>
    </div>
  );
}
