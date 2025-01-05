import React from "react";

import MusicController from "@/components/MusicController";
import RecordController from "@/components/RecordController/RecordController";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  playTab: () => void;
  pauseTab: () => void;
  stopTab: () => void;
  changeTempo: (newTempo: number) => void;
}

export default function ControllerWrapper(props: Props) {
  const { className, ...forwardProps } = props;

  return (
    <div className={cn("fixed bottom-0 left-0 z-50 w-screen bg-white", className)}>
      <RecordController />
      <MusicController {...forwardProps} />
    </div>
  );
}
