import { RefObject, useState } from "react";

const defaultOptions = {
  scaleUnit: 0.1,
  scrollUnit: 600,
};

export function usePdfScore(
  containerRef: RefObject<HTMLDivElement>,
  options?: {
    scaleUnit?: number;
    scrollUnit?: number;
  }
) {
  const { scaleUnit, scrollUnit } = { ...defaultOptions, ...options };
  const [scale, setScale] = useState(1);

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + scaleUnit, 2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - scaleUnit, 0.5));
  };

  const movePrev = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scaledScrollUnit = scrollUnit * scale;

    // 현재 스크롤 위치가 맨 왼쪽이고 맨 위인 경우 아무 동작도 하지 않음
    if (container.scrollLeft <= 0 && container.scrollTop <= 0) {
      return;
    }

    // 왼쪽으로 더 스크롤할 수 있는 경우
    if (container.scrollLeft > 0) {
      container.scrollTo({
        left: container.scrollLeft - scaledScrollUnit,
        top: container.scrollTop,
        behavior: "smooth",
      });
    }
    // 왼쪽 끝에 도달했지만 위로 더 스크롤할 수 있는 경우
    else if (container.scrollTop > 0) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollTo({
        left: maxScrollLeft,
        top: container.scrollTop - scaledScrollUnit,
        behavior: "smooth",
      });
    }
  };

  const moveNext = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scaledScrollUnit = scrollUnit * scale;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const maxScrollTop = container.scrollHeight - container.clientHeight;
    const isAtMaxRight = Math.abs(container.scrollLeft - maxScrollLeft) < 1;
    const isAtMaxBottom = Math.abs(container.scrollTop - maxScrollTop) < 1;

    // 맨 아래이고 맨 오른쪽이면 아무것도 하지 않음
    if (isAtMaxRight && isAtMaxBottom) {
      return;
    }

    // 오른쪽으로 더 스크롤할 수 있는 경우
    if (!isAtMaxRight) {
      container.scrollTo({
        left: container.scrollLeft + scaledScrollUnit,
        top: container.scrollTop,
        behavior: "smooth",
      });
    }
    // 오른쪽 끝이고 아래로 더 스크롤할 수 있는 경우에만 다음 줄 처음으로
    else if (!isAtMaxBottom) {
      container.scrollTo({
        left: 0,
        top: container.scrollTop + scaledScrollUnit,
        behavior: "smooth",
      });
    }
  };

  return {
    scale,
    zoomIn,
    zoomOut,
    moveNext,
    movePrev,
  };
}
