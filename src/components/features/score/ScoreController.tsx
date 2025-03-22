import React from "react";
import { Player } from "tone";

import { Button } from "@/components/ui/button";
import { useAudioPlayers } from "@/hooks/useAudioPlayers/useAudioPlayers";
import useAudioTrackStore, { AudioTrackId } from "@/store/audioStore";

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

  const { isPlaying, togglePlayPause, toggleStop, toggleTrackMute } = useAudioPlayers();
  const { tracks } = useAudioTrackStore();

  // 사용 가능한 트랙 목록
  const trackIds = Object.keys(tracks) as AudioTrackId[];

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center gap-2 bg-white/80 p-4">
      <PlayPauseBtn isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
      <StopBtn toggleStop={toggleStop} />
      {/* 기능 테스트용 각 트랙별 음소거 버튼 */}
      <div className="ml-4 flex items-center gap-2">
        {trackIds.map((trackId) => (
          <Button key={trackId} size="sm" onClick={() => toggleTrackMute(trackId)} className="text-xs">
            {trackId.charAt(0).toUpperCase() + trackId.slice(1)}
          </Button>
        ))}
      </div>
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
