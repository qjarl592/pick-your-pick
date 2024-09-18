import React from "react";

import AudioRecorder from "@/components/AudioRecorder";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-5">
      {/* <MusicController audioUrl="/musics/Basket_Case.mp3" defaultTempo={175} /> */}
      <AudioRecorder />
    </div>
  );
}
