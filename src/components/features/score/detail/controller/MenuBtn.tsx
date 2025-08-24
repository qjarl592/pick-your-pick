import { EllipsisVertical } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import AudioMixModal from "../mixer/AudioMixModal";

interface Props {
  className?: string;
}

export default function MenuBtn({ className }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className={cn("", className)}>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <AudioMixModal>
          <Button>mix</Button>
        </AudioMixModal>
      </PopoverContent>
    </Popover>
  );
}
