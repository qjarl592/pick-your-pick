import { EllipsisVertical } from "lucide-react";
import React from "react";

import AudioMixModal from "@/components/AudioMixModal/AudioMixModal";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
