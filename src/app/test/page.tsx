import MusicController from "@/components/MusicController";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <MusicController audioUrl="/musics/Basket_Case.mp3" defaultTempo={185} />
    </div>
  );
}
