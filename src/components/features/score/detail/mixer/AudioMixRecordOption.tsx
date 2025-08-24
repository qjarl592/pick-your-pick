import Image from "next/image";
import React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  isSelected: boolean;
  updatedAt: string;
  volume: number;
  onSelect: (value: boolean) => void;
  onChangeVolume: (value: number) => void;
}

export default function AudioMixRecordOption({
  isSelected,
  updatedAt,
  volume,
  onSelect,
  onChangeVolume,
}: Props) {
  const renderVolumeText = (volume: number) => {
    switch (volume) {
      case 1:
        return "매우 낮음";
      case 2:
        return "낮음";
      case 3:
        return "보통";
      case 4:
        return "높음";
      case 5:
        return "매우 높음";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        "flex h-24 w-full cursor-pointer items-center justify-center gap-4",
        {
          "border-2 border-blue-600": isSelected,
        }
      )}
      tabIndex={0}
      onClick={() => onSelect(!isSelected)}
    >
      <Image src="/icons/record.png" alt="record icon" width={40} height={40} />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">녹음 트랙</span>
          <span className="text-xs text-muted-foreground">{updatedAt}</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 })
            .map((_, index) => index + 1)
            .map((volumeOpt) => (
              <Button
                key={`volume-option-${volumeOpt}`}
                className={cn({ "border-2 border-blue-600": volume === volumeOpt })}
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeVolume(volumeOpt);
                }}
              >
                {renderVolumeText(volumeOpt)}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
