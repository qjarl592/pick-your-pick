import { AudioLines, Volume, VolumeX } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useAudioTrackStore, { AudioTrackId } from "@/store/audioStore";

interface Props {
  className?: string;
  toggleTrackMute: (trackId: AudioTrackId) => void;
}

export default function MixBtn({ className, toggleTrackMute }: Props) {
  const { tracks } = useAudioTrackStore();

  // 사용 가능한 트랙 목록
  const trackIds = Object.keys(tracks) as AudioTrackId[];

  const getTrackName = (trackId: string) => {
    return trackId.charAt(0).toUpperCase() + trackId.slice(1);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("", className)}>
          <AudioLines />
          <span className="ml-2">믹싱</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="ml-4 flex flex-col gap-2">
          {trackIds.map((trackId) => (
            <div key={trackId} className="flex">
              <div>{getTrackName(trackId)}</div>
              <Button size="sm" onClick={() => toggleTrackMute(trackId)}>
                {tracks[trackId].isMuted ? <VolumeX size={16} /> : <Volume size={16} />}
              </Button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
