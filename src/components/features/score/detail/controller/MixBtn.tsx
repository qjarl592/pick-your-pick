import { AudioLines, Volume, VolumeX } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { AudioTrackId, useAudioStore } from "@/store/audioStore";

interface Props {
  className?: string;
}

export default function MixBtn({ className }: Props) {
  // 사용 가능한 트랙 목록
  const { isLoad, toggleMute, setVolume, tracks } = useAudioStore();
  const trackIds = (tracks ? Object.keys(tracks) : []) as AudioTrackId[];

  const clickSolo = (trackId: AudioTrackId) => {
    if (!tracks) return;

    Object.keys(tracks).forEach((i) => {
      const id = i as AudioTrackId;
      const curTrack = tracks[id];
      if (id === trackId) {
        if (curTrack.isMuted) toggleMute(id);
      } else {
        if (!curTrack.isMuted) toggleMute(id);
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("", className)} disabled={!isLoad}>
          <AudioLines />
          <span className="ml-2">믹싱</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="px-3 py-2">
        <div className="flex flex-col gap-1">
          {tracks &&
            trackIds.map((trackId) => {
              const trackName = trackId.charAt(0).toUpperCase() + trackId.slice(1);
              const track = tracks[trackId];

              return (
                <div key={trackId} className="flex items-center gap-2">
                  <div className="h-9 min-w-20 items-center justify-center rounded-md border-2 border-input px-3 py-2 text-center text-sm font-semibold">
                    {trackName}
                  </div>
                  <Button size="sm" onClick={() => toggleMute(trackId)}>
                    {track.isMuted ? <VolumeX size={16} /> : <Volume size={16} />}
                  </Button>
                  <Button size="sm" onClick={() => clickSolo(trackId)}>
                    Solo
                  </Button>
                  <Slider
                    value={[tracks[trackId].volume]}
                    max={100}
                    min={0}
                    step={1}
                    onValueChange={(values) => {
                      setVolume(trackId, values[0]);
                    }}
                  />
                </div>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
