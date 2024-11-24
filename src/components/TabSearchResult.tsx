"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/lib/axios";

import TabInfo from "./TabInfo";

export type TabInfoType = {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
};

type TabApiResponse = {
  id: string;
  title: string;
  artist: string;
  thumbnail_url: string;
};

type Props = { keyword: string };

export default function TabSearchResult(props: Props) {
  const { keyword } = props;

  const { data } = useQuery({
    queryKey: ["searchTabs", keyword],
    queryFn: async ({ queryKey }) => {
      const [_, keyword] = queryKey;
      const response = await api.get<{ result: TabApiResponse[] }>("/search", {
        params: {
          keyword: keyword,
        },
      });
      const data = response.data.result;
      const tabInfos: Array<TabInfoType> = data.map((item: TabApiResponse) => {
        return {
          id: item.id,
          title: item.title,
          artist: item.artist,
          thumbnailUrl: item.thumbnail_url,
        };
      });
      return tabInfos;
    },
  });

  return (
    <ScrollArea className="h-[50vh] w-full rounded-xl border border-gray-200 shadow-md">
      <div className="p-4">
        {!keyword.length && <h4 className="mb-4 text-lg">Sample Tabs</h4>}
        {data?.map((tabInfo) => <TabInfo key={tabInfo.id} tabInfo={tabInfo} />)}
      </div>
    </ScrollArea>
  );
}
