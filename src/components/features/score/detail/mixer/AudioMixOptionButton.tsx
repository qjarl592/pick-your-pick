import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { AudioTrackType } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface Props {
  type: AudioTrackType;
  isSelected: boolean;
  onSelect: (value: boolean) => void;
}

export default function AudioMixOptionButton({ type, isSelected, onSelect }: Props) {
  return (
    <Button
      className={cn("flex h-16 w-full items-center justify-center gap-2", {
        "border-2 border-blue-600": isSelected,
      })}
      variant="outline"
      onClick={() => onSelect(!isSelected)}
    >
      <Image src={`/icons/${type}.png`} alt={`${type} icon`} width={30} height={30} />
      <span className="text-lg font-semibold">{type}</span>
    </Button>
  );
}
