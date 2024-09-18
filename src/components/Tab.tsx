"use client";

import React, { useRef, useState, useEffect, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import useTabStore from "@/store/tabStore";
import MusicController from "./MusicController";

declare global {
  interface Window {
    alphaTab: {
      AlphaTabApi: any;
    };
  }
}

type AlphaTab = typeof window.alphaTab.AlphaTabApi;

interface Props extends HTMLAttributes<HTMLDivElement> {
  file: string;
  fileUrl: string;
}

export default function Tab(props: Props) {
  const { file, fileUrl, className, ...rest } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const { originTempo, setTempo, setMinTempo, setMaxTempo, setOriginTempo } =
    useTabStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<AlphaTab>(null);

  useEffect(() => {
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
  }, [file, originTempo, setMaxTempo, setMinTempo, setOriginTempo, setTempo]);

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
    <div className={cn("w-full", className)} {...rest}>
      <div ref={containerRef} />
      {originTempo !== null && (
        <div className="fixed z-50 bottom-0 w-screen left-0 bg-white">
          <MusicController
            fileUrl={fileUrl}
            playPauseTab={playPauseTab}
            stopTab={stopTab}
          />
        </div>
      )}
    </div>
  );
}
