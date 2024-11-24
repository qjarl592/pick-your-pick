import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import useDebounce from "@/hooks/useDebounce/useDebounce";
import { youtubeApi } from "@/lib/axios";

import YoutubeSearchResult from "./YoutubeSearchResult";
import { Input } from "../ui/input";

interface YoutubeSearchSnippet {
  title: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
}

export interface YoutubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: YoutubeSearchSnippet;
}

export default function YoutubeSearchWrapper() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);

  const getYoutubeSearch = useQuery({
    queryKey: ["youtubeSearch", debouncedKeyword],
    queryFn: async ({ queryKey }) => {
      const [_, keyword] = queryKey;
      const res = await youtubeApi.get("", {
        params: {
          key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
          part: "snippet",
          q: `${keyword} audio`,
          maxResults: 5,
          type: "video",
        },
      });
      return res.data.items;
    },
    enabled: debouncedKeyword.length > 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setKeyword(value);
  };

  return (
    <>
      <Input placeholder="곡 제목을 입력해주세요" onChange={handleChange} value={keyword} />
      <YoutubeSearchResult queryResult={getYoutubeSearch} />
    </>
  );
}
