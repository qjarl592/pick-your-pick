"use client";

import { useState, useRef, useEffect } from "react";

import MusicController from "@/components/MusicController";
import Tab from "@/components/Tab";
import useTabStore from "@/store/tabStore";

declare global {
  interface Window {
    alphaTab: {
      AlphaTabApi: any;
    };
  }
}

type AlphaTab = typeof window.alphaTab.AlphaTabApi;

interface TabData {
  tabFileUrl: string;
  tabAudioUrl: string;
}

interface Props {
  tabData: TabData;
}

export default function Wrapper(props: Props) {
  const { tabData } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const { originTempo, setTempo, setMinTempo, setMaxTempo, setOriginTempo } = useTabStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<AlphaTab>(null);

  useEffect(() => {
    const initializeAlphaTab = () => {
      if (!containerRef.current || apiRef.current) return;

      const newApi = new window.alphaTab.AlphaTabApi(containerRef.current, {
        file: tabData.tabFileUrl,
        player: {
          enablePlayer: true,
          soundFont: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2",
        },
        enableCursor: true,
        enableAnimatedBeatCursor: true,
        display: {
          layoutMode: "page",
          staveProfile: "tab",
        },
        notation: {
          elements: {
            scoreWords: false,
            scoreMusic: false,
            scoreWordsAndMusic: false,
          },
        },
        fontDirectory: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/font/",
      });

      newApi.playerStateChanged.on((args: any) => {
        setIsPlaying(args.state === 1);
      });

      newApi.renderFinished.on(() => {
        if (originTempo) return;
        const originalTempo = newApi.score.tempo;
        const minSpeed = 0.125;
        const maxSpeed = 8;
        const minTempo = Math.ceil(originalTempo * minSpeed);
        const maxTempo = Math.floor(originalTempo * maxSpeed);
        setTempo(originalTempo);
        setMinTempo(minTempo);
        setMaxTempo(maxTempo);
        setOriginTempo(originalTempo);
      });

      apiRef.current = newApi;
    };

    initializeAlphaTab();

    return () => {
      if (apiRef.current) {
        apiRef.current.destroy();
        apiRef.current = null;
      }
    };
  }, [originTempo, setMaxTempo, setMinTempo, setOriginTempo, setTempo, tabData.tabFileUrl]);

  const playPauseTab = () => {
    if (!apiRef.current) {
      return;
    }

    if (isPlaying) {
      apiRef.current.pause();
    } else {
      apiRef.current.play();
    }
  };

  const stopTab = () => {
    if (apiRef.current) {
      apiRef.current.stop();
    }
  };
  return (
    <>
      <Tab className="mt-32 px-10" containerRef={containerRef} />
      <div className="fixed bottom-0 left-0 z-50 w-screen bg-white">
        <MusicController fileUrl={tabData.tabFileUrl} playPauseTab={playPauseTab} stopTab={stopTab} />
      </div>
    </>
  );
}
