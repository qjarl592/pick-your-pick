import React from "react";

import AudioProgress from "./controller/AudioProgress";
import FeatureBtn from "./controller/FeatureBtn";
import MenuBtn from "./controller/MenuBtn";
import MixBtn from "./controller/MixBtn";
import MoveNextBtn from "./controller/MoveNextBtn";
import MovePrevBtn from "./controller/MovePrevBtn";
import PlayPauseBtn from "./controller/PlayPauseBtn";
import RecordBtn from "./controller/RecordBtn";
import StopBtn from "./controller/StopBtn";
import { useScoreControl } from "../../../hooks/useScoreControl/useScoreControl";

interface Props {
  PdfControlFeatures: ReturnType<typeof useScoreControl>;
}

export default function ScoreController({ PdfControlFeatures }: Props) {
  const { moveNext, movePrev } = PdfControlFeatures;
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center gap-2 bg-white/80 p-4">
      <PlayPauseBtn />
      <StopBtn />
      <MixBtn />
      <FeatureBtn />
      <MovePrevBtn movePrev={movePrev} />
      <MoveNextBtn moveNext={moveNext} />
      <AudioProgress />
      <RecordBtn />
      <MenuBtn />
    </div>
  );
}
