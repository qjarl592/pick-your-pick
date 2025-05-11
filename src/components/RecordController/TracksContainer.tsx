import React, { useRef, useState, useEffect } from "react";
import * as Tone from "tone";

import { useRecordStore } from "@/store/recordStore";

import AudioVisualizer from "./AudioVisualizer";
import { Button } from "../ui/button";

interface TrackContainerProps {
  originalUrl: string;
  recordingUrl: string | null;
  isRecording: boolean;
  recordingStartTime: number;
}

export default function TracksContainer({
  originalUrl,
  recordingUrl,
  isRecording,
  recordingStartTime,
}: TrackContainerProps) {
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

  // 녹음 정보 상태
  const [recordingDuration, setRecordingDuration] = useState<number>(0);

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

        // 컨테이너 너비 설정 제거 - 스크롤 방지
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
        // 실제 녹음 길이 저장
        setRecordingDuration(player.buffer.duration);
      },
    }).toDestination();

    recordingPlayerRef.current = player;

    return () => {
      if (recordingPlayerRef.current) {
        recordingPlayerRef.current.dispose();
        recordingPlayerRef.current = null;
      }
    };
  }, [recordingUrl, isRecording, recordingStartTime]);

  // 재생 상태 변경 처리
  useEffect(() => {
    if (!isReady) return;

    let animationId: number | null = null;

    const updateProgress = () => {
      if (Tone.Transport.state === "started") {
        const time = Tone.Transport.seconds;
        setCurrentTime(time);

        if (progressRef.current) {
          // 시간 비율을 퍼센트로 계산
          const progressPercent = (time / duration) * 100;
          progressRef.current.style.left = `${progressPercent}%`;
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
        // 녹음된 오디오는 녹음 시작 위치에서 재생되도록 설정
        recordingPlayerRef.current.sync().start(recordingStartTime);
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
  }, [duration, isPlay, isReady, recordingStartTime]);

  // 위치 클릭 처리
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isReady) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    const validTime = Math.max(0, Math.min(clickPercent * duration, duration));

    // Tone.js 위치 이동
    Tone.Transport.seconds = validTime;

    // 진행바 업데이트
    if (progressRef.current) {
      progressRef.current.style.left = `${clickPercent * 100}%`;
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
    // 30초 간격으로 마커 생성
    const interval = 30; // 30초 간격
    const totalSeconds = Math.ceil(duration);

    // 첫 번째 마커 (0초)
    markers.push(
      <div key={0} className="absolute" style={{ left: "0%" }}>
        {"0:00"}
      </div>
    );

    // 30초 간격 마커
    for (let i = interval; i < totalSeconds; i += interval) {
      const percentPosition = (i / totalSeconds) * 100;
      markers.push(
        <div key={i} className="absolute" style={{ left: `${percentPosition}%` }}>
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

      <div className="rounded border p-4">
        <div className="relative mb-2 h-6 border-b text-xs text-gray-500">{renderTimeMarkers()}</div>
        <div ref={containerRef} className="relative min-w-full" onClick={handleContainerClick}>
          <div ref={progressRef} className="absolute inset-y-0 z-10 w-0.5 bg-red-500" style={{ left: 0 }} />
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
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex">
              <span className="text-sm font-medium">녹음</span>
              {recordingUrl && recordingPlayerRef.current && (
                <span className="ml-2 text-xs text-gray-500">
                  (녹음 길이: {formatTime(recordingDuration)}, 시작 위치: {formatTime(recordingStartTime)})
                </span>
              )}
            </div>
            <div className="h-[70px] rounded bg-gray-100">
              {!recordingUrl && (
                <div className="flex h-full items-center justify-center text-gray-500">
                  녹음된 오디오가 없습니다
                </div>
              )}
              {recordingUrl && recordingPlayerRef.current && (
                <div className="relative h-full">
                  {recordingStartTime > 0 && (
                    <div
                      className="absolute left-0 top-0 h-full bg-gray-200"
                      style={{
                        width: `${(recordingStartTime / duration) * 100}%`,
                      }}
                    />
                  )}

                  <div
                    className="absolute top-0 h-full"
                    style={{
                      left: `${(recordingStartTime / duration) * 100}%`,
                      width: `${(recordingDuration / duration) * 100}%`,
                    }}
                  >
                    <AudioVisualizer
                      player={recordingPlayerRef.current}
                      color="#8A2BE2"
                      progressColor="#7126B3"
                      height={70}
                      progress={currentTime}
                      duration={recordingDuration}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
