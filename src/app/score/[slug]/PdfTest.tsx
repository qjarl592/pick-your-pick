"use client";

import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "pdfjs-dist/webpack";

import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const scaleUnit = 0.1;
const scrollUnit = 600;

export default function PdfTest() {
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setTotalPages(numPages);
  }

  const handleClickPlus = () => {
    setScale((prev) => Math.min(prev + scaleUnit, 2));
  };

  const handleClickMinus = () => {
    setScale((prev) => Math.max(prev - scaleUnit, 0.5));
  };

  const handleClickPrev = () => {
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

  const handleClickNext = () => {
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

  return (
    <div className="relative h-screen w-full">
      <div ref={containerRef} className="h-[calc(100vh-64px)] w-full overflow-auto">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            transition: "transform 0.3s ease-in-out",
            width: scale <= 1 ? "100%" : `${100 / scale}%`,
          }}
        >
          <Document file="/test.pdf" onLoadSuccess={onDocumentLoadSuccess} className="w-full">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div key={`page_${index + 1}`} className="w-full">
                <Page
                  width={window.innerWidth}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="w-full"
                />
              </div>
            ))}
          </Document>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-50 flex w-full gap-2 border-t bg-white/80 p-4 backdrop-blur-sm">
        <Button size="icon" variant="outline" onClick={handleClickPlus}>
          <Plus />
        </Button>
        <Button size="icon" variant="outline" onClick={handleClickMinus}>
          <Minus />
        </Button>
        <Button size="icon" variant="outline" onClick={handleClickPrev}>
          <ChevronLeft />
        </Button>
        <Button size="icon" variant="outline" onClick={handleClickNext}>
          <ChevronRight />
        </Button>
        <span className="ml-2 flex items-center text-sm text-gray-500">{Math.round(scale * 100)}%</span>
      </div>
    </div>
  );
}
