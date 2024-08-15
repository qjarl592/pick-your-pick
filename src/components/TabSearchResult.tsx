import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TabInfo from "./TabInfo";

export type TabInfo = {
  title: string;
  artist: string;
  thumbnailUrl: string;
};

type Props = { keyword: String };

const sampleTabs: TabInfo[] = [
  {
    title: "Wake Me Up When September Ends",
    artist: "green day",
    thumbnailUrl: "https://i.ytimg.com/vi/ulRXvH8VOl8/mqdefault.jpg",
  },
  {
    title: "Wake Me Up When September Ends",
    artist: "green day",
    thumbnailUrl: "https://i.ytimg.com/vi/ulRXvH8VOl8/mqdefault.jpg",
  },
  {
    title: "Wake Me Up When September Ends",
    artist: "green day",
    thumbnailUrl: "https://i.ytimg.com/vi/ulRXvH8VOl8/mqdefault.jpg",
  },
];

export default function TabSearchResult(props: Props) {
  const { keyword } = props;

  return (
    <ScrollArea className="h-[50vh] w-full rounded-xl border border-gray-200 shadow-md">
      <div className="p-4">
        <h4 className="mb-4 text-lg">검색 결과</h4>
        {sampleTabs.map((tabInfo, key) => (
          <TabInfo key={key} tabInfo={tabInfo} />
        ))}
      </div>
    </ScrollArea>
  );
}
