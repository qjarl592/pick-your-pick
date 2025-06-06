import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Player } from "tone";

import { getAllAudioUrls } from "@/lib/storage";
import { useAudioStore } from "@/store/audioStore";

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
  const { initTracks } = useAudioStore();
  const { data: session } = useSession();

  useEffect(() => {
    // URL에서 scoreId 추출
    const pathname = window.location.pathname;
    const scoreId = pathname.split("/").pop();

    const userId = session?.user?.id;

    if (!scoreId || !userId) {
      return;
    }

    // 개발환경에서도 실제 Storage 사용 (테스트용)
    const audioUrls = getAllAudioUrls(userId, scoreId);

    initTracks(audioUrls);
  }, [initTracks, session?.user?.id]);

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
