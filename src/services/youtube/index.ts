import { QueryFunctionContext } from "@tanstack/react-query";

import { youtubeApi } from "../axios";

export const getYoutubeSearch = async ({ queryKey }: QueryFunctionContext) => {
  const [_, keyword] = queryKey;
  const res = await youtubeApi.get("", {
    params: {
      key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
      part: "snippet",
      q: `${keyword} audio`,
      maxResults: 3,
      type: "video",
    },
  });
  return res.data.items;
};
