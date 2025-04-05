import React from "react";
import { Player } from "tone";

import { useAudioPlayers } from "@/hooks/useAudioPlayers/useAudioPlayers";

import AudioProgress from "./controller/AudioProgress";
import FeatureBtn from "./controller/FeatureBtn";
import MenuBtn from "./controller/MenuBtn";
import MixBtn from "./controller/MixBtn";
import MoveNextBtn from "./controller/MoveNextBtn";
import MovePrevBtn from "./controller/MovePrevBtn";
import PlayPauseBtn from "./controller/PlayPauseBtn";
import RecordBtn from "./controller/RecordBtn";
import StopBtn from "./controller/StopBtn";
import { usePdfScore } from "../../../hooks/usePdfScore/usePdfScore";

// 모든 플레이어를 저장하는 객체
export interface Players {
  [trackId: string]: Player;
}
interface Props {
  pdfScore: ReturnType<typeof usePdfScore>;
}

export default function ScoreController({ pdfScore }: Props) {
  const { moveNext, movePrev } = pdfScore;

  const {
    tracks,
    isPlaying,
    togglePlayPause,
    toggleStop,
    toggleTrackMute,
    toggleTrackMuteOthers,
    updateTrackVolume,
  } = useAudioPlayers();

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center gap-2 bg-white/80 p-4">
      <PlayPauseBtn isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
      <StopBtn toggleStop={toggleStop} />
      <MixBtn
        tracks={tracks}
        toggleTrackMute={toggleTrackMute}
        toggleTrackMuteOthers={toggleTrackMuteOthers}
        updateTrackVolume={updateTrackVolume}
      />
      <FeatureBtn />
      <MovePrevBtn movePrev={movePrev} />
      <MoveNextBtn moveNext={moveNext} />
      <AudioProgress />
      <RecordBtn />
      <MenuBtn />
    </div>
  );
}
