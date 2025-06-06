import { Prisma } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";

import { createScore } from "@/app/actions/score";
import { uploadFile } from "@/lib/supabase/supabase";
import { aiServerApi } from "@/services/axios";
import { YoutubeSearchItem } from "@/type/youtube";

import { TabForm, TabInputForm } from "./TabForm";
import YoutubeSearchWrapper from "./YoutubeSearchWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  children: ReactNode;
  onSubmitSuccess: () => void;
}

export default function AddTabModal({ children, onSubmitSuccess }: Props) {
  const { data: session } = useSession();

  const defaultVideo = {
    id: {
      videoId: "",
    },
    snippet: {
      title: "",
      channelTitle: "",
      thumbnails: {
        medium: {
          url: "",
        },
      },
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeSearchItem>(defaultVideo);

  const createScoreMutation = async ({
    formData,
    userId,
  }: {
    formData: TabInputForm & { thumbnailUrl: string };
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

    // // 악보 pdf 업로드
    if (!res.data?.id) {
      throw new Error("score_id is undefined!!");
    }
    const scoreId = res.data.id;
    const pdfUrl = `/${userId}/${scoreId}/score.pdf`;
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
  };

  const { mutate } = useMutation({
    mutationFn: createScoreMutation,
    onSuccess: () => {
      setIsOpen(false);
      onSubmitSuccess();
    },
    onError: (error) => console.log(error),
  });

  const handleSubmit = (formData: TabInputForm & { thumbnailUrl: string }) => {
    if (!session) return;
    mutate({ formData, userId: session.user.id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col gap-3 overflow-auto">
        <DialogHeader className="w-full">
          <DialogTitle>악보 추가</DialogTitle>
          <DialogDescription>아래 양식을 작성해 새로운 악보를 추가해 주세요.</DialogDescription>
        </DialogHeader>
        <YoutubeSearchWrapper onSelectVideo={setSelectedVideo} />
        <TabForm selectedVideo={selectedVideo} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
