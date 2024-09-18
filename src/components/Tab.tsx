"use client";

import { useRef, useState, useEffect, useCallback } from "react";

type AlphaTab = typeof window.alphaTab.AlphaTabApi;

declare global {
  interface Window {
    alphaTab: {
      AlphaTabApi: any;
    };
  }
}

interface Props {
  file: string;
}

export default function Tab(props: Props) {
  const { file } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<AlphaTab | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const initializeAlphaTab = useCallback(() => {
    if (window.alphaTab && containerRef.current && !apiRef.current) {
      const newApi = new window.alphaTab.AlphaTabApi(containerRef.current, {
        file: file,
        player: {
          enablePlayer: true,
          soundFont: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2",
          scrollElement: containerRef.current,
          enableCursor: true,
          enableAnimatedBeatCursor: true,
        },
        display: {
          layoutMode: "page",
          staveProfile: "tab",
        },
        notation: {
          elements: {
            scoreTitle: true,
            scoreSubTitle: true,
            scoreArtist: true,
            scoreAlbum: true,
            scoreWords: false,
            scoreMusic: false,
            scoreWordsAndMusic: false,
            scoreCopyright: false,
          },
        },
        fontDirectory: "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/font/",
      });

      newApi.playerStateChanged.on((args: any) => {
        setIsPlaying(args.state === 1); // 1 corresponds to the Playing state
      });

      apiRef.current = newApi;
    }
  }, [file]);

  useEffect(() => {
    initializeAlphaTab();
    addCursorStyle();

    return () => {
      if (apiRef.current) {
        apiRef.current.destroy();
        apiRef.current = null;
      }
    };
  }, [initializeAlphaTab]);

  const addCursorStyle = () => {
    const style = document.createElement("style");
    style.textContent = `
      .at-cursor-beat {
        background: rgba(64, 64, 255, 0.75);
        width: 3px;
      }
    `;
    document.head.appendChild(style);
  };

  const handlePlayPause = () => {
    if (apiRef.current) {
      if (isPlaying) {
        apiRef.current.pause();
      } else {
        apiRef.current.play();
      }
    }
  };

  const handleStop = () => {
    if (apiRef.current) {
      apiRef.current.stop();
    }
  };

  return (
    <div>
      <div>
        <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <div ref={containerRef} />
    </div>
  );
}
