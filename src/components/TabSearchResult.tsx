"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TabInfo from "./TabInfo";
import api from "@/lib/axios";

export type TabInfoType = {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
};

type Props = { keyword: String };

export default function TabSearchResult(props: Props) {
  const { keyword } = props;
  const [tabInfos, setTabInfos] = useState<Array<TabInfoType>>([]);

  useEffect(() => {
    if (tabInfos.length) return;
    (async () => {
      await getSearchTabs();
    })();
  }, []);

  const getSearchTabs = async () => {
    const response = await api.get("/search", {
      params: {
        keyword: keyword,
      },
    });
    const data = response.data.result;
    const tabInfos: TabInfoType[] = data.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        artist: item.artist,
        thumbnailUrl: item.thumbnail_url,
      };
    });
    setTabInfos(tabInfos);
  };

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
