import { Score } from "@prisma/client";
import { motion } from "framer-motion";
import { Play, Star, Music, Calendar, Clock, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { deleteScore } from "@/app/actions/score";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

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

  const handleClickDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `"${title}" 악보를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없으며, 관련된 모든 파일이 삭제됩니다.`
    );

    if (!confirmed) return;

    try {
      await deleteScore(id);

      alert(`"${title}" 악보가 성공적으로 삭제되었습니다.`);

      // 삭제 성공 후 쿼리 초기화
      onDelete();
    } catch (error) {
      console.error("Delete error:", error);
      alert("악보 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
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
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 z-20 size-7 rounded-full bg-red-500 p-0 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-red-600 group-hover:opacity-100"
            onClick={handleClickDelete}
          >
            <Trash2 size={12} className="text-white" />
          </Button>
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
            <p className="line-clamp-2 max-w-36 px-2 text-center font-bold">{title}</p>
            <p className="max-w-36 truncate text-sm text-gray-300">{artist}</p>
            <div className="mt-3 rounded-full bg-white/20 px-3 py-1 text-xs">지금 연주하기</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
