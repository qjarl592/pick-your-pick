import React, { ReactNode, useState } from "react";

import { YoutubeSearchItem } from "@/type/youtube";

import YoutubeSearchWrapper from "./YoutubeSearchWrapper";
import { TabForm, TabInputForm } from "../TabForm/TabForm";
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
}

export default function AddTabModal({ children }: Props) {
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

  const handleSubmit = async (data: TabInputForm & { thumbnailUrl: string }) => {
    try {
      // API 호출이나 데이터 처리
      console.log("제출된 데이터:", data);
      // 성공적으로 처리되면 모달 닫기
      setIsOpen(false);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-3">
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
