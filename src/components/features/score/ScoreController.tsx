import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

import { useScoreControl } from "../../../hooks/useScoreControl/useScoreControl";

type Props = ReturnType<typeof useScoreControl>;

export default function ScoreController({ scale, zoomIn, zoomOut, moveNext, movePrev }: Props) {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full gap-2 border-t bg-white/80 p-4 backdrop-blur-sm">
      <Button size="icon" variant="outline" onClick={zoomIn}>
        <Plus />
      </Button>
      <Button size="icon" variant="outline" onClick={zoomOut}>
        <Minus />
      </Button>
      <Button size="icon" variant="outline" onClick={movePrev}>
        <ChevronLeft />
      </Button>
      <Button size="icon" variant="outline" onClick={moveNext}>
        <ChevronRight />
      </Button>
      <span className="ml-2 flex items-center text-sm text-gray-500">{Math.round(scale * 100)}%</span>
    </div>
  );
}
