"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import useTabStore from "@/store/tabStore";
import TabUtilBar from "./TabUtilBar";

declare global {
  interface Window {
    alphaTab: {
      AlphaTabApi: any;
    };
  }
}

type AlphaTab = typeof window.alphaTab.AlphaTabApi;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  file: string;
  audioUrl: string;
}

export default function Tab({ file, audioUrl, className, ...props }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { originTempo, setTempo, setMinTempo, setMaxTempo, setOriginTempo } =
    useTabStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<AlphaTab | null>(null);

  const initializeAlphaTab = () => {
    if (!containerRef.current || apiRef.current) return;

    const newApi = new window.alphaTab.AlphaTabApi(containerRef.current, {
      file: file,
      player: {
        enablePlayer: true,
        soundFont:
          "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2",
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
      fontDirectory:
        "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/font/",
    });

    newApi.playerStateChanged.on((args: any) => {
      setIsPlaying(args.state === 1);
    });

    newApi.renderFinished.on(() => {
      if (originTempo !== null) return;
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

  useEffect(() => {
    initializeAlphaTab();

    return () => {
      if (apiRef.current) {
        apiRef.current.destroy();
        apiRef.current = null;
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (apiRef.current) {
      if (isPlaying) {
        apiRef.current.pause();
      } else {
        apiRef.current.play();
      }
    }
  };

  const stopWithReset = () => {
    if (apiRef.current) {
      apiRef.current.stop();
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <div ref={containerRef} />
      {originTempo !== null && (
        <TabUtilBar
          audioUrl={audioUrl}
          defaultTempo={originTempo}
          togglePlayPauseTab={togglePlayPause}
          stopWithResetTab={stopWithReset}
        />
      )}
    </div>
  );
}
