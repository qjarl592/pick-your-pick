import React, { useRef, useState, useEffect } from "react";
import * as Tone from "tone";

import { useRecordStore } from "@/store/recordStore";

import { Button } from "../ui/button";
import AudioVisualizer from "./visualizer/AudioVisualizer";

interface TrackContainerProps {
  originalUrl: string;
  recordingUrl: string | null;
  isRecording: boolean;
}

const PIXELS_PER_SECOND = 100;

export default function TracksContainer({ originalUrl, recordingUrl, isRecording }: TrackContainerProps) {
  // UI 참조
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Tone.js 플레이어 참조
  const originalPlayerRef = useRef<Tone.Player | null>(null);
  const recordingPlayerRef = useRef<Tone.Player | null>(null);

  // 상태
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { isPlay, setIsPlay } = useRecordStore();

  // 원곡 초기화
  useEffect(() => {
    // 이전 플레이어 정리
    if (originalPlayerRef.current) {
      originalPlayerRef.current.dispose();
      originalPlayerRef.current = null;
    }

    // 새 플레이어 생성
    const player = new Tone.Player({
      url: originalUrl,
      onload: () => {
        setDuration(player.buffer.duration);
        setIsReady(true);

        // 컨테이너 너비 설정
        if (containerRef.current) {
          const containerWidth = Math.ceil(player.buffer.duration * PIXELS_PER_SECOND);
          containerRef.current.style.width = `${containerWidth}px`;
        }
      },
    }).toDestination();

    originalPlayerRef.current = player;

    return () => {
      if (originalPlayerRef.current) {
        originalPlayerRef.current.dispose();
        originalPlayerRef.current = null;
      }
    };
  }, [originalUrl]);

  // 녹음 트랙 초기화
  useEffect(() => {
    if (isRecording || !recordingUrl) return;

    // 이전 플레이어 정리
    if (recordingPlayerRef.current) {
      recordingPlayerRef.current.dispose();
      recordingPlayerRef.current = null;
    }

    // 새 플레이어 생성
    const player = new Tone.Player({
      url: recordingUrl,
      onload: () => {
        console.log("녹음 트랙 로드 완료");
      },
    }).toDestination();

    recordingPlayerRef.current = player;

    return () => {
      if (recordingPlayerRef.current) {
        recordingPlayerRef.current.dispose();
        recordingPlayerRef.current = null;
      }
    };
  }, [recordingUrl, isRecording]);

  // 재생 상태 변경 처리
  useEffect(() => {
    if (!isReady) return;

    let animationId: number | null = null;

    const updateProgress = () => {
      if (Tone.Transport.state === "started") {
        const time = Tone.Transport.seconds;
        setCurrentTime(time);

        if (progressRef.current) {
          const position = time * PIXELS_PER_SECOND;
          progressRef.current.style.left = `${position}px`;
        }

        if (isPlay) {
          animationId = requestAnimationFrame(updateProgress);
        }
      }
    };

    if (isPlay) {
      // Tone.js 시작
      Tone.Transport.start();

      // 플레이어 시작
      if (originalPlayerRef.current) {
        originalPlayerRef.current.sync().start(0);
      }

      if (recordingPlayerRef.current) {
        recordingPlayerRef.current.sync().start(0);
      }

      animationId = requestAnimationFrame(updateProgress);
    } else {
      // 일시정지
      Tone.Transport.pause();

      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlay, isReady]);

  // 위치 클릭 처리
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isReady) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left + containerRef.current.scrollLeft;
    const time = clickX / PIXELS_PER_SECOND;
    const validTime = Math.max(0, Math.min(time, duration));

    // Tone.js 위치 이동
    Tone.Transport.seconds = validTime;

    // 진행바 업데이트
    if (progressRef.current) {
      progressRef.current.style.left = `${validTime * PIXELS_PER_SECOND}px`;
    }

    setCurrentTime(validTime);
  };

  // 재생/일시정지 토글
  const handlePlayToggle = () => {
    setIsPlay(!isPlay);
  };

  // 시간 형식 변환
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // 타임라인 마커 렌더링
  const renderTimeMarkers = () => {
    if (duration <= 0) return null;

    const markers = [];
    for (let i = 0; i <= Math.ceil(duration); i += 10) {
      markers.push(
        <div key={i} className="absolute" style={{ left: `${i * PIXELS_PER_SECOND}px` }}>
          {formatTime(i)}
        </div>
      );
    }
    return markers;
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button onClick={handlePlayToggle} disabled={isRecording || !isReady}>
          {isPlay ? "일시정지" : "재생"}
        </Button>
        <div className="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div className="overflow-auto rounded border p-4">
        {/* 타임라인 */}
        <div className="relative mb-2 h-6 border-b text-xs text-gray-500">{renderTimeMarkers()}</div>

        {/* 트랙 컨테이너 */}
        <div ref={containerRef} className="relative min-w-full" onClick={handleContainerClick}>
          {/* 공통 진행바 */}
          <div ref={progressRef} className="absolute inset-y-0 z-10 w-0.5 bg-red-500" style={{ left: 0 }} />

          {/* 트랙 영역 - 파형 시각화는 AudioVisualizer 컴포넌트 별도 구현 필요 */}
          <div className="mb-6">
            <div className="mb-2 flex">
              <span className="text-sm font-medium">원곡</span>
            </div>
            <div className="h-[70px] rounded bg-gray-100">
              <AudioVisualizer
                player={originalPlayerRef.current}
                color="#4682B4"
                progressColor="#3a6d99"
                height={70}
                progress={currentTime}
                duration={duration}
                pixelsPerSecond={PIXELS_PER_SECOND}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex">
              <span className="text-sm font-medium">녹음</span>
            </div>
            <div className="h-[70px] rounded bg-gray-100">
              {!recordingUrl && (
                <div className="flex h-full items-center justify-center text-gray-500">
                  녹음된 오디오가 없습니다
                </div>
              )}
              {recordingUrl && recordingPlayerRef.current && (
                <AudioVisualizer
                  player={recordingPlayerRef.current}
                  color="#8A2BE2"
                  progressColor="#7126B3"
                  height={70}
                  progress={currentTime}
                  duration={duration}
                  pixelsPerSecond={PIXELS_PER_SECOND}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
