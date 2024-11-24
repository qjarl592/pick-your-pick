import { QueryFunctionContext } from "@tanstack/react-query";

import { youtubeApi } from "@/lib/axios";

export interface YoutubeSearchSnippet {
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

export const getYoutubeSearch = async ({ queryKey }: QueryFunctionContext) => {
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
};
