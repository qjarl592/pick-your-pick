import React from "react";
import MusicController from "./MusicController";

type Props = {
  defaultTempo: number;
  audioUrl: string;
  togglePlayPauseTab: () => void;
  stopWithResetTab: () => void;
};

export default function TabUtilBar(props: Props) {
  return (
    <div className="fixed z-50 bottom-0 w-screen left-0 bg-white">
      <MusicController {...props} />
    </div>
  );
}
