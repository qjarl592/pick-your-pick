"use client";

import MusicController from "@/components/MusicController";
import Tab from "@/components/Tab";

export interface TabData {
  tabFileUrl: string;
  tabAudioUrl: string;
}

interface Props {
  tabData: TabData;
}

export default function Wrapper(props: Props) {
  const { tabData } = props;

  return (
    <>
      <Tab className="mt-32 px-10" tabData={tabData} />
      <MusicController fileUrl={tabData.tabAudioUrl} />
    </>
  );
}
