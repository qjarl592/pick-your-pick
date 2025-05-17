import React, { useEffect } from "react";
import { Player } from "tone";

import { checkIsDev } from "@/lib/utils";
import { AudioTrackId, useAudioStore } from "@/store/audioStore";

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

  useEffect(() => {
    const audioTrackIds: AudioTrackId[] = ["bass", "drum", "guitar", "others", "piano", "vocal"];

    // URL에서 scoreId 추출
    const pathname = window.location.pathname;
    const scoreId = pathname.split("/").pop(); // URL에서 마지막 부분(scoreId) 추출

    // Cloudflare Worker URL
    const WORKER_URL = "https://pick-your-pick.jinwonmusicdev.workers.dev";

    const sampleUrlList = audioTrackIds.reduce((acc, id) => {
      // 개발 환경일 경우 로컬 샘플 사용
      const baseUrl = "/sample/audio/";
      const extension = ".mp3";
      const localAudioUrl = baseUrl + id + extension;

      // 프로덕션 환경에서는 Worker URL + 실제 scoreId 사용
      const prodAudioUrl = `${WORKER_URL}/Score/audio/${scoreId}/${id}.mp3`;

      // 개발 환경과 프로덕션 환경 구분
      const finalUrl = checkIsDev() ? localAudioUrl : prodAudioUrl;

      return {
        ...acc,
        [id]: finalUrl,
      };
    }, {}) as { [key in AudioTrackId]: string };

    initTracks(sampleUrlList);
  }, [initTracks]);

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
