"use client";

import { useRef } from "react";

import Tab from "@/components/Tab";
import useAlphaTab from "@/hooks/useAlphaTab/useAlphaTab";
import useTabStore from "@/store/tab/tabStore";

import ControllerWrapper from "./ControllerWrapper";

export interface TabData {
  tabFileUrl: string;
  tabAudioUrl: string;
}

interface Props {
  fileUrl: string;
}

export default function Wrapper(props: Props) {
  const { fileUrl } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const { apiRef } = useAlphaTab(containerRef, fileUrl);
  const { setIsPlay, originTempo, setTempo } = useTabStore();

  const playTab = () => {
    if (!apiRef.current) return;
    apiRef.current.play();
    setIsPlay(true);
  };

  const pauseTab = () => {
    if (!apiRef.current) return;
    apiRef.current.pause();
    setIsPlay(false);
  };

  const stopTab = () => {
    if (!apiRef.current) return;
    apiRef.current.stop();
    setIsPlay(false);
  };

  const changeTempo = (newTempo: number) => {
    if (!apiRef.current) return;
    const newPlaybackSpeed = newTempo / originTempo;
    console.log(newTempo, originTempo, newPlaybackSpeed);
    apiRef.current.playbackSpeed = newPlaybackSpeed;
    setTempo(newTempo);
  };

  return (
    <>
      <Tab className="mt-32 px-10" ref={containerRef} />
      {apiRef.current && (
        <ControllerWrapper
          playTab={playTab}
          pauseTab={pauseTab}
          stopTab={stopTab}
          changeTempo={changeTempo}
        />
      )}
    </>
  );
}
