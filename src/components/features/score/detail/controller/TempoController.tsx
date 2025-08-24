import { Minus, Plus } from "lucide-react";
import { KeyboardEvent, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useAudioStore } from "@/store/audioStore";

const tempoRange = [0, 2];
const tempoMarkUnit = 0.25;
const marks = Array.from({ length: Math.round((tempoRange[1] - tempoRange[0]) / tempoMarkUnit) + 1 }).map(
  (_, i) => tempoMarkUnit * i
);

export default function TempoController() {
  const { playbackSpeed, setPlaybackSpeed } = useAudioStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.value = playbackSpeed.toString();
  }, [playbackSpeed]);

  const handleChangeValue = (value: number[]) => {
    const nextValue = value[0];
    setPlaybackSpeed(nextValue);
  };

  const handleClickUpdateSpeed = (dir: boolean) => {
    const unit = 0.1;
    setPlaybackSpeed(playbackSpeed + unit * (dir ? +1 : -1));
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() !== "enter") return;
    if (!inputRef.current) return;
    const newValue = Number(inputRef.current.value);
    if (Number.isNaN(newValue)) return;
    setPlaybackSpeed(newValue);
  };

  return (
    <div>
      <div className="flex items-center justify-between text-base">
        <div className="w-16 font-semibold">재생속도</div>
        <div className="flex items-center gap-1">
          <Button
            className="h-8 rounded-sm px-1 py-2"
            variant="outline"
            onClick={() => handleClickUpdateSpeed(false)}
          >
            <Minus />
          </Button>
          <Button
            className="h-8 rounded-sm px-1 py-2"
            variant="outline"
            onClick={() => handleClickUpdateSpeed(true)}
          >
            <Plus />
          </Button>
          <Input
            ref={inputRef}
            className="h-8 w-16 text-right"
            defaultValue={playbackSpeed}
            onKeyDown={handleKeydown}
          />
        </div>
      </div>
      <div className="relative mt-2 w-full pt-4">
        <div className="absolute w-full">
          {marks.map((mark) => (
            <div
              key={mark}
              className="absolute -top-[20px] text-xs"
              style={{ left: `${mark * 50}%`, transform: "translateX(-50%)" }}
            >
              {`x${mark}`}
            </div>
          ))}
        </div>
        <Slider step={0.25} min={0} max={2.0} value={[playbackSpeed]} onValueChange={handleChangeValue} />
      </div>
    </div>
  );
}
