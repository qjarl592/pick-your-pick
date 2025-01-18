// "use client";

// import { PauseIcon, PlayIcon, RepeatIcon, SquareIcon } from "lucide-react";
// import React from "react";

// import TempoSlider from "@/components//TempoSlider";
// import { Button } from "@/components/ui/button";
// import useTabStore from "@/store/tab/tabStore";

// interface Props {
//   playTab: () => void;
//   pauseTab: () => void;
//   stopTab: () => void;
//   changeTempo: (newTempo: number) => void;
// }

// export default function MusicController(props: Props) {
//   const { playTab, pauseTab, stopTab, changeTempo } = props;
//   const { tempo, isPlay } = useTabStore();

//   const handleClickPlayPause = () => {
//     if (isPlay) {
//       pauseTab();
//     } else {
//       playTab();
//     }
//   };

//   const handleClickStop = () => {
//     stopTab();
//   };

//   return (
//     <div className="fixed bottom-0 left-0 z-50 flex w-screen space-x-2 rounded-xl border-2 bg-white p-2">
//       <Button variant="outline" className="size-16" onClick={handleClickPlayPause}>
//         {isPlay ? <PauseIcon /> : <PlayIcon />}
//       </Button>
//       <Button variant="outline" className="size-16" onClick={handleClickStop}>
//         <SquareIcon />
//       </Button>
//       <TempoSlider tempo={tempo} changeTempo={changeTempo} />
//       <Button variant="outline" className="flex h-16 w-24 flex-col items-center justify-center">
//         <RepeatIcon />
//         <span className="text-xs text-muted-foreground">Loop</span>
//       </Button>
//     </div>
//   );
// }
