import { useRef, useEffect, RefObject } from "react";

import useTabStore from "@/store/tab/tabStore";

declare global {
  interface Window {
    alphaTab: {
      AlphaTabApi: any;
      synth: any;
    };
  }
}

export type AlphaTab = typeof window.alphaTab.AlphaTabApi;

export default function useAlphaTab(containerRef: RefObject<HTMLDivElement>, fileUrl: string) {
  const apiRef = useRef<AlphaTab>();
  const { originTempo, initTab } = useTabStore();

  useEffect(() => {
    const initializeAlphaTab = () => {
      if (!containerRef.current || apiRef.current) return;

      const newApi = new window.alphaTab.AlphaTabApi(containerRef.current, {
        file: fileUrl,
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

      newApi.metronomeVolume = 1;

      newApi.renderFinished.on(() => {
        if (originTempo) return;
        const originalTempo = newApi.score.tempo;
        initTab({ tempo: originalTempo, originTempo: originalTempo });
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
  }, [originTempo, containerRef, fileUrl, initTab]);

  return { apiRef };
}
