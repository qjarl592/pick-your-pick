import React, { useEffect, useRef } from "react";
import { Player } from "tone";

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

interface Props {
  pdfScore: ReturnType<typeof usePdfScore>;
}

export default function ScoreController({ pdfScore }: Props) {
  const { moveNext, movePrev } = pdfScore;
  const playerRef = useRef<Player | null>(null);

  // 컴포넌트 마운트시 오디오 플레이어 초기화
  useEffect(() => {
    // 플레이어 인스턴스 생성
    playerRef.current = new Player({
      url: "/audio/guitar.mp3", // public 폴더 내 경로
      autostart: false,
    }).toDestination();

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center gap-2 bg-white/80 p-4">
      <PlayPauseBtn playerRef={playerRef} />
      <StopBtn playerRef={playerRef} />
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
