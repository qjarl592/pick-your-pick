import { QueryFunctionContext } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { TabApiResponse, TabInfoType } from "@/type/tab";

export const getTabTableAll = async ({ queryKey }: QueryFunctionContext) => {
  const [_, keyword] = queryKey;
  const response = await api.get<{ result: TabApiResponse[] }>("/search", {
    params: {
      keyword: keyword,
    },
  });
  const data = response.data.result;
  const tabInfos: TabInfoType[] = data.map((item: TabApiResponse) => {
    return {
      id: item.id,
      title: item.title,
      artist: item.artist,
      thumbnailUrl: item.thumbnail_url,
    };
  });
  return tabInfos;
};