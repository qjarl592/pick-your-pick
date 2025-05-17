import { Wrench } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAudioStore } from "@/store/audioStore";

import Metronome from "./Metronome";
import TempoController from "./TempoController";

interface Props {
  className?: string;
}

export default function FeatureBtn({ className }: Props) {
  const { isLoad } = useAudioStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("", className)} disabled={!isLoad}>
          <Wrench />
          <span className="ml-2">제어</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <TempoController />
        <Separator className="my-2" />
        <Metronome />
      </PopoverContent>
    </Popover>
  );
}
