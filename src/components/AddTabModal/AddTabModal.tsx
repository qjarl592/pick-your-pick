import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

import { YoutubeSearchItem } from "@/type/youtube";

import YoutubeSearchWrapper from "./YoutubeSearchWrapper";
import { TabForm, TabInputForm } from "../TabForm/TabForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

export default function AddTabModal() {
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

  const handleSubmit = async (data: TabInputForm & { tabFilePath: string }) => {
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
      <DialogTrigger asChild>
        <Button className={navigationMenuTriggerStyle()} variant="link">
          <PlusIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex min-w-[60vw] justify-between">
        <div className="flex-1">
          <DialogHeader>
            <DialogTitle>타브 악보 추가</DialogTitle>
            <DialogDescription>아래 양식을 작성해 새로운 타브 악보를 추가해 주세요.</DialogDescription>
          </DialogHeader>
          <YoutubeSearchWrapper onSelectVideo={setSelectedVideo} />
        </div>
        <div className="flex-1">
          <TabForm selectedVideo={selectedVideo} onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
