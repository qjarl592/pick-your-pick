import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Player } from "tone";

import { usePdfScore } from "@/hooks/usePdfScore";
import { getAllAudioUrls } from "@/lib/storage";
import { useAudioStore } from "@/store/audioStore";

import AudioProgress from "./AudioProgress";
import FeatureBtn from "./FeatureBtn";
import MenuBtn from "./MenuBtn";
import MixBtn from "./MixBtn";
import MoveNextBtn from "./MoveNextBtn";
import MovePrevBtn from "./MovePrevBtn";
import PlayPauseBtn from "./PlayPauseBtn";
import RecordBtn from "./RecordBtn";
import StopBtn from "./StopBtn";

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
  const pathname = usePathname();
  const router = useRouter();

  const userId = session?.user?.id;
  const scoreId = pathname.split("/").pop();

  const { error } = useQuery({
    queryKey: ["initTracks", userId, scoreId],
    queryFn: async ({ queryKey }) => {
      const [_, userId, scoreId] = queryKey;
      if (!scoreId || !userId) {
        throw new Error("Invalid userId or scoreId!");
      }
      const audioUrls = getAllAudioUrls(userId, scoreId);
      await initTracks(audioUrls);
      return true;
    },
    enabled: !!scoreId && !!userId,
    retry: false,
  });

  useEffect(() => {
    if (error) {
      toast.error("음원를 불러오는데 실패했습니다.", {
        description: "문제가 반복되면 관리자에게 문의해주세요.",
      });
      router.push("/score");
    }
  }, [error, router]);

  if (error) {
    return null;
  }

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
