import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import { getYoutubeSearch } from "@/services/youtube";
import { YoutubeSearchItem } from "@/type/youtube";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

interface Props {
  keyword: string;
  onSelectVideo: (video: YoutubeSearchItem) => void;
}

export default function YoutubeSearchResult({ keyword, onSelectVideo }: Props) {
  const { data, isLoading, isFetching } = useQuery<YoutubeSearchItem[]>({
    queryKey: ["youtubeSearch", keyword],
    queryFn: getYoutubeSearch,
    enabled: keyword.length > 0,
  });

  const showLoading = isLoading || isFetching;

  if (showLoading) {
    return (
      <div className="mt-2 flex flex-col gap-2 rounded-md shadow-md">
        {Array.from({ length: 5 })
          .map((_, idx) => idx)
          .map((id) => {
            return (
              <div
                className="flex items-center space-x-5 px-2 py-1"
                key={`youtube-search-result-skeleton-${id}`}
              >
                <Skeleton className="h-[68px] w-[120px] rounded-sm" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-full max-w-[300px]" />
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  if (!data) return <></>;

  if (data.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <div className="mt-2 flex flex-col gap-2 rounded-md shadow-md ">
      {data.map((item: YoutubeSearchItem) => {
        const { snippet } = item;

        return (
          <Button
            key={item.id.videoId}
            className="flex h-fit w-full justify-start space-x-5 rounded-sm px-2 py-1 hover:bg-accent hover:text-accent-foreground"
            onClick={() => onSelectVideo(item)}
            variant="ghost"
          >
            <Image
              className="min-h-[68px]"
              src={snippet.thumbnails.medium.url}
              width={120}
              height={68}
              alt={snippet.title}
              priority
            />
            <div className="flex min-w-0 flex-col gap-1">
              <Label className="text-left text-sm font-bold">제목: </Label>
              <span className="w-full truncate text-sm">{snippet.title}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
