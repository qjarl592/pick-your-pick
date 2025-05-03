import React, { useEffect, useRef } from "react";
import * as Tone from "tone";

interface AudioVisualizerProps {
  player: Tone.Player | null;
  color: string;
  progressColor: string;
  height: number;
  progress: number;
  duration: number;
  pixelsPerSecond: number;
}

export default function AudioVisualizer({
  player,
  color,
  progressColor,
  height,
  progress,
  duration,
  pixelsPerSecond,
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

    // 캔버스 크기 설정
    const width = Math.ceil(duration * pixelsPerSecond);
    canvas.width = width;
    canvas.height = height;

    // 파형 데이터 가져오기
    const buffer = player.buffer.getChannelData(0); // 모노인 경우 첫 번째 채널만
    const step = Math.ceil(buffer.length / width);
    const amp = height / 2;

    // 캔버스 초기화
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;

    // 파형 그리기
    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      // 구간 내의 최소, 최대 값 계산
      for (let j = 0; j < step; j++) {
        const datum = buffer[i * step + j] || 0;
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
      const progressX = progress * pixelsPerSecond;

      // 프로그레스 이전 부분 다시 그리기
      ctx.fillStyle = progressColor;

      for (let i = 0; i < progressX; i++) {
        let min = 1.0;
        let max = -1.0;

        for (let j = 0; j < step; j++) {
          const datum = buffer[i * step + j] || 0;
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }

        const y1 = (1 + min) * amp;
        const y2 = (1 + max) * amp;

        ctx.fillRect(i, y1, 1, y2 - y1);
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

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [player, color, progressColor, height, progress, duration, pixelsPerSecond]);

  return (
    <div className="relative size-full">
      <canvas ref={canvasRef} className="size-full" style={{ height: `${height}px` }} />
    </div>
  );
}
