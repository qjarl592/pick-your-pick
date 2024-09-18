"use client";

import { DrumIcon, Minus, Plus } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTabStore from "@/store/tabStore";

import { Slider } from "./ui/slider";

type Props = {
  tempo: number;
  setTempo: Dispatch<SetStateAction<number>>;
};

export default function TempoSlider(props: Props) {
  const { tempo, setTempo } = props;
  const { originTempo } = useTabStore();
  const [tempoPercent, setTempoPercent] = useState(100);

  const min = 0;
  const max = originTempo * 2;

  const handleSliderChange = (value: number[]) => {
    const percent = value[0];
    setTempoPercent(percent);
    const newTempo = Math.round((originTempo * percent) / 100);
    setTempo(newTempo);
  };

  const tempoUp = () => {
    if (tempo > min && tempo < max) setTempo((prev) => prev + 1);
  };

  const tempoDown = () => {
    if (tempo > min && tempo < max) setTempo((prev) => prev - 1);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex flex-col justify-center items-center h-16 w-24">
          <div className="flex justify-center items-center space-x-1">
            <DrumIcon />
            <span className="text-xl">{tempo}</span>
          </div>
          <span className="text-xs text-muted-foreground">Tempo</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="center" sideOffset={5} className="w-52">
        <DropdownMenuLabel className="flex items-center justify-start space-x-2">
          <Button variant="ghost" className="p-1 h-5 w-5 rounded-full" onClick={tempoDown}>
            <Minus size={15} />
          </Button>
          <span>{tempo} bpm</span>
          <Button variant="ghost" className="p-1 h-5 w-5 rounded-full" onClick={tempoUp}>
            <Plus size={15} />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex justify-center items-center h-16">
          <Slider
            defaultValue={[tempoPercent]}
            min={10}
            max={200}
            step={1}
            onValueChange={handleSliderChange}
          />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
