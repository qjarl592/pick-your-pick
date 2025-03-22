import { Pause, Play } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function PlayPauseBtn({ className }: Props) {
  const [isPlay, setIsPlay] = useState(false);

  const handleClick = () => setIsPlay(!isPlay);

  return (
    <Button variant="outline" size="icon" className={cn("", className)} onClick={handleClick}>
      {!isPlay ? <Play /> : <Pause />}
    </Button>
  );
}
