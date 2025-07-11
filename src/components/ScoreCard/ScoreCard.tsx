import { Score } from "@prisma/client";
import { motion } from "framer-motion";
import { Play, Star, Music, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import ScoreDeleteButton from "./ScoreDeleteButton";

interface Props {
  score: Score;
  onDelete: () => void;
}

export default function ScoreCard({ score, onDelete }: Props) {
  const { thumbnailUrl, title, artist, difficulty, lastPracticeDate, id, createdAt } = score;
  const router = useRouter();

  if (!thumbnailUrl || !title || !artist || !difficulty || !createdAt) {
    return null;
  }

  const handleClick = () => {
    router.push(`/score/${id}`);
  };

  const lastPractice = lastPracticeDate && new Date(lastPracticeDate);
  const today = new Date();
  const daysDifference =
    lastPractice && Math.floor((today.getTime() - lastPractice.getTime()) / (1000 * 3600 * 24));

  const practiceStatus =
    !daysDifference || daysDifference > 14
      ? "bg-red-100 text-red-600"
      : daysDifference > 7
        ? "bg-amber-100 text-amber-600"
        : "bg-green-100 text-green-600";

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card
        className="group relative h-60 w-44 overflow-hidden rounded-xl border border-blue-50 shadow-lg transition-all hover:cursor-pointer hover:shadow-xl"
        onClick={handleClick}
      >
        {/* 썸네일 이미지 */}
        <div className="relative h-36 overflow-hidden bg-blue-50">
          <Image
            src={thumbnailUrl}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          {/* 난이도 뱃지 */}
          <div className="absolute right-2 top-2 flex items-center rounded-full bg-white/80 px-2 py-1 backdrop-blur-sm">
            {Array.from({ length: 5 })
              .map((_, idx) => idx)
              .map((id) => (
                <Star
                  key={`${title}-star${id}`}
                  fill={id < difficulty ? "#fde047" : "none"}
                  className={`${id < difficulty ? "text-yellow-400" : "text-gray-300"}`}
                  size={12}
                />
              ))}
          </div>
          {/* 최근 연습 상태 표시 */}
          <div
            className={`absolute left-2 top-2 ${practiceStatus} flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium`}
          >
            <Clock size={10} />
            {daysDifference ? (daysDifference === 0 ? "오늘" : `${daysDifference}일 전`) : "미연습"}
          </div>

          {/* 삭제 버튼 - hover 시에만 표시 */}
          <ScoreDeleteButton id={id} title={title} artist={artist} onDelete={onDelete} />
        </div>

        {/* 정보 섹션 */}
        <div className="flex flex-col p-3">
          <CardTitle className="mb-1 text-base">
            <p className="truncate font-medium">{title}</p>
          </CardTitle>
          <div className="flex items-center gap-1">
            <Music size={12} className="text-blue-500" />
            <CardDescription className="truncate text-xs">{artist}</CardDescription>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <Calendar size={12} className="text-blue-500" />
            <CardDescription className="text-xs">
              {new Date(createdAt).toLocaleDateString("ko-KR")}
            </CardDescription>
          </div>
        </div>

        {/* 호버 오버레이 - 차콜 색상으로 변경 */}
        <div className="z-5 absolute inset-0 flex items-center justify-center bg-gradient-to-t from-gray-900/95 to-gray-800/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-80">
          <div className="flex flex-col items-center justify-center text-white">
            <div className="mb-4 rounded-full bg-white p-3">
              <Play className="text-gray-800" size={28} />
            </div>
            <p className="max-w-36 px-2 text-center font-bold">{title}</p>
            <p className="max-w-36 truncate text-sm text-gray-300">{artist}</p>
            <div className="mt-3 rounded-full bg-white/20 px-3 py-1 text-xs">지금 연주하기</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
