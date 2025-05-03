import React, { useEffect, useRef } from "react";
import * as Tone from "tone";

interface AudioVisualizerProps {
  player: Tone.Player | null;
  color: string;
  progressColor: string;
  height: number;
  progress: number;
  duration: number; // 공유되는 전체 길이 (원곡 기준)
  pixelsPerSecond: number;
}

export default function AudioVisualizer({
  player,
  color,
  progressColor,
  height,
  progress,
  duration,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // 파형 데이터 생성을 위한 효과
  useEffect(() => {
    if (!player || !player.buffer || !canvasRef.current) return;

    // 캔버스 설정
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 부모 컨테이너의 너비에 맞게 캔버스 크기 조정
    const parentWidth = canvas.parentElement?.clientWidth || 300;
    canvas.width = parentWidth;
    canvas.height = height;

    // 파형 데이터 가져오기
    const buffer = player.buffer.getChannelData(0); // 모노인 경우 첫 번째 채널만
    const amp = height / 2;

    // 플레이어의 실제 오디오 길이 사용
    const playerDuration = player.buffer.duration;

    // 실제 오디오 길이의 비율
    const durationRatio = playerDuration / duration;

    // 현재 플레이어의 실제 사용 너비 계산 (전체 너비 중 실제 길이에 해당하는 부분)
    const actualWidth = Math.floor(parentWidth * durationRatio);

    // 오디오 버퍼와 캔버스 픽셀 간의 비율 계산
    const compressionRatio = buffer.length / actualWidth;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, height);
    ctx.fillStyle = color;

    // 파형 그리기
    for (let i = 0; i < actualWidth; i++) {
      let min = 1.0;
      let max = -1.0;

      // 각 픽셀에 해당하는 오디오 데이터 범위 계산
      const startIndex = Math.floor(i * compressionRatio);
      const endIndex = Math.floor((i + 1) * compressionRatio);

      // 해당 범위의 최소, 최대 값 계산
      for (let j = startIndex; j < endIndex; j++) {
        const datum = buffer[j] || 0;
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }

      // 진폭 계산
      const y1 = (1 + min) * amp;
      const y2 = (1 + max) * amp;

      // 막대 그리기
      ctx.fillRect(i, y1, 1, y2 - y1);
    }

    // 프로그레스 영역 그리기
    const drawProgress = () => {
      if (!ctx || !canvas) return;

      // 전체 진행률을 계산
      const progressRatio = progress / duration;

      // 플레이어의 실제 길이에 맞게 진행 정도 조정
      const adjustedProgress = Math.min(progressRatio, durationRatio);

      // 실제 표시할 픽셀 위치 계산
      const progressX = Math.floor(adjustedProgress * parentWidth);

      // 프로그레스 이전 부분 다시 그리기
      ctx.fillStyle = progressColor;

      for (let i = 0; i < progressX; i++) {
        // 실제 파형이 그려진 영역 내에서만 진행 표시
        if (i < actualWidth) {
          let min = 1.0;
          let max = -1.0;

          const startIndex = Math.floor(i * compressionRatio);
          const endIndex = Math.floor((i + 1) * compressionRatio);

          for (let j = startIndex; j < endIndex; j++) {
            const datum = buffer[j] || 0;
            if (datum < min) min = datum;
            if (datum > max) max = datum;
          }

          const y1 = (1 + min) * amp;
          const y2 = (1 + max) * amp;

          ctx.fillRect(i, y1, 1, y2 - y1);
        }
      }
    };

    // 초기 프로그레스 그리기
    drawProgress();

    // 파형 그리기 함수 업데이트
    const updateProgress = () => {
      drawProgress();
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    // 애니메이션 시작
    animationRef.current = requestAnimationFrame(updateProgress);

    // 화면 크기 변경 시 캔버스 다시 그리기
    const handleResize = () => {
      if (canvas.parentElement) {
        const newWidth = canvas.parentElement.clientWidth;
        canvas.width = newWidth;

        // 비율 재계산
        const newActualWidth = Math.floor(newWidth * durationRatio);
        const newCompressionRatio = buffer.length / newActualWidth;

        // 전체 파형 다시 그리기
        ctx.clearRect(0, 0, newWidth, height);
        ctx.fillStyle = color;

        for (let i = 0; i < newActualWidth; i++) {
          let min = 1.0;
          let max = -1.0;

          const startIndex = Math.floor(i * newCompressionRatio);
          const endIndex = Math.floor((i + 1) * newCompressionRatio);

          for (let j = startIndex; j < endIndex; j++) {
            const datum = buffer[j] || 0;
            if (datum < min) min = datum;
            if (datum > max) max = datum;
          }

          const y1 = (1 + min) * amp;
          const y2 = (1 + max) * amp;

          ctx.fillRect(i, y1, 1, y2 - y1);
        }

        drawProgress();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [player, color, progressColor, height, progress, duration]);

  return (
    <div className="relative size-full">
      <canvas ref={canvasRef} className="size-full" style={{ height: `${height}px` }} />
    </div>
  );
}
