"use client";

import React, { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/axios";

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
  const [tabInfos, setTabInfos] = useState<Array<TabInfoType>>([]);

  //TODO: react query로 변경
  useEffect(() => {
    if (tabInfos.length) return;

    const getSearchTabs = async () => {
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
      setTabInfos(tabInfos);
    };

    (async () => {
      await getSearchTabs();
    })();
  }, [keyword, tabInfos.length]);

  return (
    <ScrollArea className="h-[50vh] w-full rounded-xl border border-gray-200 shadow-md">
      <div className="p-4">
        {!keyword.length && <h4 className="mb-4 text-lg">Sample Tabs</h4>}
        {tabInfos.map((tabInfo) => (
          <TabInfo key={tabInfo.id} tabInfo={tabInfo} />
        ))}
      </div>
    </ScrollArea>
  );
}
