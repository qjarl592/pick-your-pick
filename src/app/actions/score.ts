"use server";

import { Prisma } from "@prisma/client";

import prisma from "@/lib/supabase/prisma";
import { supabase } from "@/lib/supabase/supabase";

// Create
export async function createScore(data: Prisma.ScoreCreateInput) {
  try {
    const score = await prisma.score.create({ data });
    return { data: score };
  } catch (error) {
    console.error("Score create failed:", error);
    return { error: "Failed to create score" };
  }
}

// Read - FindUnique
export async function getScore(id: string) {
  try {
    const score = await prisma.score.findUnique({
      where: { id },
    });
    if (!score) {
      return { error: "Score not found" };
    }
    return { data: score };
  } catch (error) {
    console.error("Score get failed:", error);
    return { error: "Failed to get score" };
  }
}

// Read - FindFirst
export async function getFirstScore(where: Prisma.ScoreWhereInput) {
  try {
    const score = await prisma.score.findFirst({ where });
    if (!score) {
      return { error: "No score found" };
    }
    return { data: score };
  } catch (error) {
    console.error("Score get failed:", error);
    return { error: "Failed to get score" };
  }
}

// Read - FindMany
export async function getScores(params: {
  where?: Prisma.ScoreWhereInput;
  orderBy?: Prisma.ScoreOrderByWithRelationInput;
}) {
  try {
    const scores = await prisma.score.findMany(params);
    return { data: scores };
  } catch (error) {
    console.error("Score get failed:", error);
    return { error: "Failed to get scores" };
  }
}

// Update - Single
export async function updateScore(id: string, data: Prisma.ScoreUpdateInput) {
  try {
    const score = await prisma.score.update({
      where: { id },
      data,
    });
    return { data: score };
  } catch (error) {
    console.error("Score update failed:", error);
    return { error: "Failed to update score" };
  }
}

// Storage 파일들 삭제 함수
async function deleteScoreFromStorage(scoreId: string) {
  try {
    // Storage 삭제를 위해 scoreId로 userId 찾기
    const existingScore = await prisma.score.findUnique({
      where: { id: scoreId },
    });

    if (!existingScore || !existingScore.userId) {
      return;
    }

    const storageName = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;
    const { userId } = existingScore;

    // 삭제할 파일 목록
    const filesToDelete = [
      `${userId}/${scoreId}/score.pdf`,
      `${userId}/${scoreId}/bass.mp3`,
      `${userId}/${scoreId}/drum.mp3`,
      `${userId}/${scoreId}/guitar.mp3`,
      `${userId}/${scoreId}/others.mp3`,
      `${userId}/${scoreId}/piano.mp3`,
      `${userId}/${scoreId}/vocal.mp3`,
      `${userId}/${scoreId}/original.mp3`,
    ];

    const { data } = await supabase.storage.from(storageName).remove(filesToDelete);
    return { data };
  } catch (error) {
    console.error("Storage deletion failed:", error);
    return false;
  }
}

// Delete - Single
export async function deleteScore(id: string) {
  try {
    // Storage에서 파일 삭제
    await deleteScoreFromStorage(id);

    // DB에서 삭제
    // Storage 삭제를 위해 scoreId로 userId 찾기
    const existingScore = await prisma.score.findUnique({
      where: { id },
    });

    if (!existingScore || !existingScore.userId) {
      return;
    }
    const score = await prisma.score.delete({
      where: { id },
    });
    return { data: score };
  } catch (error) {
    console.error("Score delete failed:", error);
    return { error: "Failed to delete score" };
  }
}

// Delete - Many
export async function deleteManyScores(where: Prisma.ScoreWhereInput) {
  try {
    const result = await prisma.score.deleteMany({
      where,
    });
    return { data: result };
  } catch (error) {
    console.error("Score delete failed:", error);
    return { error: "Failed to delete scores" };
  }
}
