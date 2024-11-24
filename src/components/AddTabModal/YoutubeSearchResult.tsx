import { UseQueryResult } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import { YoutubeSearchItem } from "@/api/youtube";

import { Label } from "../ui/label";

interface Props {
  queryResult: UseQueryResult<YoutubeSearchItem[]>;
}

export default function YoutubeSearchResult({ queryResult }: Props) {
  const { data, isLoading, isFetching } = queryResult;

  const showLoading = isLoading || isFetching;

  if (showLoading) {
    return <div>loading...</div>;
  }

  if (!data) return <></>;

  if (data.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <div className="mt-2 flex flex-col gap-2 rounded-md shadow-md">
      {data.map((item: YoutubeSearchItem) => {
        const { snippet } = item;

        return (
          <div
            key={item.id.videoId}
            className="flex space-x-5 rounded-sm px-2 py-1 hover:bg-accent hover:text-accent-foreground"
          >
            <Image src={snippet.thumbnails.medium.url} width={100} height={70} alt={snippet.title} />
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-bold">제목: </Label>
              <span className="text-sm">{snippet.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
