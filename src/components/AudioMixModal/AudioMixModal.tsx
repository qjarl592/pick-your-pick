import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { ReactNode, useRef, useState } from "react";
import { toast } from "sonner";

import { useAudioMix } from "@/hooks/useAudioMix/useAudioMix";
import { AudioTrackType } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { useAudioStore } from "@/store/audioStore";

import AudioMixOptionButton from "./AudioMixOptionButton";
import AudioMixRecordOption from "./AudioMixRecordOption";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  children: ReactNode;
}

export default function AudioMixModal({ children }: Props) {
  const { loaded, mixAudios } = useAudioMix();
  const { isLoad, tracks } = useAudioStore();

  const [isOpen, setIsOpen] = useState(false);
  const defaultTrackSelected = {
    bass: true,
    drum: true,
    piano: true,
    vocal: true,
    guitar: true,
    others: true,
  };
  const [trackSelected, setTrackSelected] = useState<Record<AudioTrackType, boolean>>(defaultTrackSelected);
  const defaultRecordOption = {
    selected: true,
    volume: 3,
  };
  const [recordOption, setRecordOption] = useState(defaultRecordOption);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const resetStates = () => {
    setTrackSelected(defaultTrackSelected);
    setRecordOption(defaultRecordOption);
  };

  const trackSrcList = tracks
    ? Object.entries(tracks).map(([key, item]) => ({ type: key as AudioTrackType, src: item.src }))
    : [];
  const { data: audioFiles, status } = useQuery({
    queryKey: ["getAudioFilesFromSrc"],
    queryFn: async () => {
      const fileList = await Promise.all(
        trackSrcList.map(async (item, index) => {
          const { type, src } = item;
          const fileName = src.split("/").at(-1);
          const res = await fetch(src);
          const blob = await res.blob();
          const file = new File([blob], fileName ?? `audio_${index}.mp3`);
          return {
            type,
            file,
          };
        })
      );
      return fileList;
    },
    enabled: isLoad && !!tracks,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  const downloadUrl = (url: string, fileName: string) => {
    if (!downloadLinkRef.current) return;
    const link = downloadLinkRef.current;
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (props: {
      fileName: string;
      trackFiles: File[];
      recordFile: { file: File; volume: number } | null;
    }) => {
      const { fileName, trackFiles, recordFile } = props;
      const url = await mixAudios(trackFiles, recordFile);
      downloadUrl(url, fileName);
      return fileName;
    },
    onSuccess: () => {
      toast.success("오디오 파일 다운로드에 성공했습니다..");
      resetStates();
      setIsOpen(false);
    },
    onError: () => {
      toast.error("오디오 파일 다운로드에 실패했습니다. 오류가 반복되면 관리자에게 문의해주세요");
    },
  });

  const onSelectRecord = (selected: boolean) => {
    const newRecordOption = { ...recordOption, selected };
    setRecordOption(newRecordOption);
  };

  const onChangeVolume = (volume: number) => {
    const newRecordOption = { ...recordOption, volume };
    setRecordOption(newRecordOption);
  };

  const onClickDownload = () => {
    if (!audioFiles) return;
    const fileName = `mixed_${Object.entries(trackSelected)
      .filter(([_, selected]) => selected)
      .map(([type, _]) => type)
      .join("_")}${recordOption.selected ? "_record" : ""}`;
    const trackFiles = audioFiles.filter((item) => trackSelected[item.type]).map((item) => item.file);
    // TODO: 레코드 오디오로 교체 필요
    // guitar track으로 임시 설정
    const recordFile = recordOption.selected
      ? {
          file: audioFiles.find((item) => item.type === "guitar")?.file ?? audioFiles[0].file,
          volume: 0.25 + recordOption.volume * 0.25,
        }
      : null;
    const mutationProps = {
      fileName,
      trackFiles,
      recordFile,
    };
    mutate(mutationProps);
  };

  const disableDownload =
    !loaded || // ffmpeg wasm이 없거나
    status !== "success" || // audio file을 불러오지 못했거나
    Object.values(trackSelected).reduce((cnt, selected) => cnt + (selected ? 1 : 0), 0) +
      (recordOption.selected ? 1 : 0) ===
      0; // 믹스할 오디어가 없거나

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        resetStates();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn({ "z-10": isPending })}>
        <DialogHeader>
          <DialogTitle>오디오 믹스</DialogTitle>
          <DialogDescription>각 트랙을 커스텀해서 오디오 파일을 다운로드 할 수 있습니다.</DialogDescription>
        </DialogHeader>
        {status === "pending" && (
          <div className="flex w-full flex-col items-center gap-2 p-4">
            <Loader2 className="size-8 animate-spin" />
            <div className="text-xs text-muted-foreground">오디오 믹싱을 준비중입니다...</div>
          </div>
        )}
        {status === "success" && tracks && (
          <div>
            <AudioMixRecordOption
              isSelected={recordOption.selected}
              volume={recordOption.volume}
              updatedAt="2025-08-09 21:48:00"
              onSelect={onSelectRecord}
              onChangeVolume={onChangeVolume}
            />
            <div className="mt-2 grid grid-cols-3 grid-rows-2 gap-2">
              {Object.keys(tracks).map((item) => {
                const audioType = item as AudioTrackType;
                const isSelected = trackSelected[audioType];
                const onSelect = (selected: boolean) => {
                  const newSelected = { ...trackSelected, [audioType]: selected };
                  setTrackSelected(newSelected);
                };
                return (
                  <AudioMixOptionButton
                    key={`select-btn-${item}`}
                    type={audioType}
                    isSelected={isSelected}
                    onSelect={onSelect}
                  />
                );
              })}
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>취소</Button>
          </DialogClose>
          <Button disabled={disableDownload} onClick={onClickDownload}>
            오디오 다운로드
          </Button>
          <a className="hidden" ref={downloadLinkRef} />
        </DialogFooter>
      </DialogContent>
      {isPending && (
        <DialogPortal>
          <div className="fixed left-0 top-0 z-[60] flex h-screen w-screen flex-col items-center justify-center text-primary-foreground">
            <Loader2 className="size-14 animate-spin" />
            <p className="mt-6">오디오 다운로드 중입니다. 잠시만 기다려주세요.</p>
            <p className="mt-2">오디오 다운로드는 평균적으로 3분 정도 소요됩니다.</p>
          </div>
        </DialogPortal>
      )}
    </Dialog>
  );
}
