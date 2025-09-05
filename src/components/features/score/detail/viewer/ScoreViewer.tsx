"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "pdfjs-dist/webpack";
import { toast } from "sonner";

import { usePdfScore } from "@/hooks/usePdfScore";

import ScoreController from "../controller/ScoreController";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  pdfUrl: string;
}

export default function ScoreViewer({ pdfUrl }: Props) {
  const [totalPages, setTotalPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfScore = usePdfScore(containerRef);
  const router = useRouter();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
  };

  const onDocumentLoadError = () => {
    toast.error("악보를 불러오는데 실패했습니다.", {
      description: "문제가 반복되면 관리자에게 문의해주세요.",
    });
    router.push("/score");
  };

  return (
    <div className="relative h-screen w-full">
      <div ref={containerRef} className="h-[calc(100vh-64px)] w-full overflow-auto">
        <div
          style={{
            transform: `scale(${pdfScore.scale})`,
            transformOrigin: pdfScore.scale <= 1 ? "center top" : "top left",
            transition: "all 0.3s ease-in-out",
            width: pdfScore.scale <= 1 ? "100%" : `${100 / pdfScore.scale}%`,
            margin: pdfScore.scale <= 1 ? "0 auto" : "0",
          }}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-full"
            onLoadError={onDocumentLoadError}
          >
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
      {totalPages > 0 && <ScoreController pdfScore={pdfScore} />}
    </div>
  );
}
