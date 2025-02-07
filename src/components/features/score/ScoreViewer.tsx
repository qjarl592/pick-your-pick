"use client";

import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "pdfjs-dist/webpack";

import ScoreController from "./ScoreController";
import { useScoreControl } from "../../../hooks/useScoreControl/useScoreControl";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  pdfUrl: string;
}

export default function ScoreViewer({ pdfUrl }: Props) {
  const [totalPages, setTotalPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreUtils = useScoreControl(containerRef);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
  };

  return (
    <div className="relative h-screen w-full">
      <div ref={containerRef} className="h-[calc(100vh-64px)] w-full overflow-auto">
        <div
          style={{
            transform: `scale(${scoreUtils.scale})`,
            transformOrigin: scoreUtils.scale <= 1 ? "center top" : "top left",
            transition: "all 0.3s ease-in-out",
            width: scoreUtils.scale <= 1 ? "100%" : `${100 / scoreUtils.scale}%`,
            margin: scoreUtils.scale <= 1 ? "0 auto" : "0",
          }}
        >
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className="w-full">
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
      {totalPages > 0 && <ScoreController {...scoreUtils} />}
    </div>
  );
}
