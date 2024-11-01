"use client";

import React, { HTMLAttributes, useRef, useEffect } from "react";

import useAlphaTab from "@/hooks/useAlphaTab/useAlphaTab";
import { cn } from "@/lib/utils";
import useTabStore from "@/store/tab/tabStore";

import { TabData } from "./tab/composite/Wrappter";

interface Props extends HTMLAttributes<HTMLDivElement> {
  tabData: TabData;
}

import MusicController from "./MusicController";
import RecordController from "./RecordController/RecordController";

declare global {
  interface Window {
    alphaTab: {
      AlphaTabApi: any;
    };
  }
}

export default function Tab(props: Props) {
  const { tabData, className, ...rest } = props;
  const { isPlaying } = useTabStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const { apiRef } = useAlphaTab(containerRef, tabData.tabFileUrl);

  useEffect(() => {
    if (!isPlaying) {
      apiRef.current.pause();
    } else {
      apiRef.current.play();
    }
  }, [apiRef, isPlaying]);

  return (
    <div className={cn("w-full", className)} {...rest}>
      <div ref={containerRef} />
        <div className="fixed bottom-0 left-0 z-50 w-screen bg-white">
          <RecordController />
          <MusicController fileUrl={fileUrl} playPauseTab={playPauseTab} stopTab={stopTab} />
        </div>
      )}
    </div>
  );
}
