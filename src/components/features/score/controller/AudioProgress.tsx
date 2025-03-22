import React from "react";

import { Slider } from "@/components/ui/slider";

const formatTime = (secUnit: number) => {
  const min = Math.floor(secUnit / 60);
  const sec = secUnit - min * 60;

  const minStr = min.toString();
  const secStr = sec < 10 ? `0${sec}` : sec.toString();

  return minStr + ":" + secStr;
};

export default function AudioProgress() {
  return (
    <div className="flex h-10 flex-1 items-center rounded-md border border-input bg-background px-2">
      <div className="mt-3 w-full">
        <Slider step={1} />
        <span className="text-xs">{`${formatTime(0)} / ${formatTime(321)}`}</span>
      </div>
    </div>
  );
}
