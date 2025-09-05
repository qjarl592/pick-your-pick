import { Prisma } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { createScore, deleteScore } from "@/lib/actions/score";
import { uploadFile } from "@/lib/supabase/supabase";
import { cn } from "@/lib/utils";
import { aiServerApi } from "@/services/axios";
import { YoutubeSearchItem } from "@/types/youtube";

import { AddScoreForm, AddScoreFormData } from "./AddScoreForm";
import YoutubeSearchWrapper from "./YoutubeSearchWrapper";

interface Props {
  children: ReactNode;
  onSubmitSuccess: () => void;
}

export default function AddScoreModal({ children, onSubmitSuccess }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeSearchItem | null>(null);

  const createScoreMutation = async ({
    formData,
    userId,
  }: {
    formData: AddScoreFormData & { thumbnailUrl: string };
    userId: string;
  }) => {
    const { pdfFile, ...rest } = formData;

    const data: Prisma.ScoreCreateInput = {
      ...rest,
      userId,
      lastPracticeDate: null,
    };
    // db row 추가
    const res = await createScore(data);

    // 악보 pdf 업로드
    if (!res.data?.id) {
      throw new Error("score_id is undefined!!");
    }
    const scoreId = res.data.id;
    const pdfUrl = `/${userId}/${scoreId}/score.pdf`;
    try {
      await uploadFile(pdfUrl, pdfFile);

      // 음원분리
      // 로컬 서버에서만 실행, aws 배포 후 프로덕션 적용 예정
      if (process.env.NODE_ENV === "development") {
        const videoId = rest.thumbnailUrl.match(/\/vi\/([^/]+)\//)?.[1];
        if (!videoId) {
          throw new Error("videoId is undefined!!");
        }
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        await aiServerApi.get("/extract_audio", {
          params: {
            youtube_url: youtubeUrl,
            user_id: userId,
            score_id: scoreId,
          },
        });
      }
      return { title: formData.title, artist: formData.artist, id: scoreId };
    } catch (e) {
      await deleteScore(scoreId);
      throw e;
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createScoreMutation,
    onSuccess: ({ title, artist, id }) => {
      onSubmitSuccess();
      toast.success("악보가 성공적으로 추가됐습니다", {
        description: `${title} by ${artist}`,
        action: {
          label: "바로가기",
          onClick: () => router.push(`/score/${id}`),
        },
      });
    },
    onSettled: () => {
      setIsOpen(false);
      setSelectedVideo(null);
    },
    onError: (error) => {
      console.log(error);
      toast.error("악보 추가에 실패했습니다.", {
        description: "문제가 반복되면 관리자에게 문의해주세요.",
      });
    },
  });

  const handleSubmit = (formData: AddScoreFormData & { thumbnailUrl: string }) => {
    if (!session) return;
    mutate({ formData, userId: session.user.id });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setSelectedVideo(null);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn("flex max-h-[600px] min-h-[600px] flex-col gap-3 overflow-auto", { "z-10": isPending })}
      >
        <DialogHeader className="w-full">
          <DialogTitle>악보 추가</DialogTitle>
          <DialogDescription>아래 양식을 작성해 새로운 악보를 추가해 주세요.</DialogDescription>
        </DialogHeader>
        {!selectedVideo ? (
          <YoutubeSearchWrapper onSelectVideo={setSelectedVideo} />
        ) : (
          <>
            <p className="text-sm font-medium leading-none">썸네일 이미지</p>
            <Image
              className="min-h-[68px]"
              src={selectedVideo.snippet.thumbnails.medium.url}
              width={180}
              height={102}
              alt={selectedVideo.snippet.title}
              priority
            />
            <AddScoreForm
              title={selectedVideo.snippet.title}
              artist={selectedVideo.snippet.channelTitle}
              thumbnailUrl={selectedVideo.snippet.thumbnails.medium.url}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </DialogContent>
      {isPending && (
        <DialogPortal>
          <div className="fixed left-0 top-0 z-[60] flex h-screen w-screen flex-col items-center justify-center text-primary-foreground">
            <Loader2 className="size-14 animate-spin" />
            <p className="mt-6">음원 등록 중입니다. 잠시만 기다려주세요.</p>
            <p className="mt-2">음원 등록은 평균적으로 5분 정도 소요됩니다.</p>
          </div>
        </DialogPortal>
      )}
    </Dialog>
  );
}
