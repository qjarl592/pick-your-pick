import { Play, Star } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import React from "react";
import { Score } from "@prisma/client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface Props {
  score: Score;
}

export default function ScoreCard({ score }: Props) {
  const { thumbnailUrl, title, artist, difficulty, lastPracticeDate } = score;
  console.log(thumbnailUrl);

  return (
    <Card className="group relative w-40 overflow-hidden rounded-xl shadow-md">
      <div className="relative size-40 overflow-hidden">
        <Image src={thumbnailUrl} className="object-cover" alt={title} fill />
      </div>
      <div className="px-2 py-1">
        <CardTitle className="text-base">
          <p className="truncate">{title}</p>
        </CardTitle>
        <CardDescription>{artist}</CardDescription>
      </div>

      {/* Dimmed overlay for entire card */}
      <div className="absolute inset-0 translate-y-full bg-black/60 transition-transform duration-300 group-hover:translate-y-0">
        <div className="flex h-full flex-col items-center justify-center p-2 text-white">
          <Play className="mb-1.5 rounded-full bg-white p-1 text-black" size={40} />
          <div className="flex flex-col items-center gap-1.5 p-2 text-sm">
            <p className="max-w-36 truncate font-semibold">{title}</p>
            <p className="max-w-36 truncate">{artist}</p>
            <div className="flex">
              {Array.from({ length: difficulty }).map((_) => (
                <Star key={nanoid()} fill="#fde047" className="text-yellow-300" size={18} />
              ))}
            </div>
            <div className="flex flex-col items-center">
              <p>마지막 연습일</p>
              <p>{lastPracticeDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
