"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/supabase/prisma";

// Create
export async function createScore(data: Prisma.ScoreCreateInput) {
  try {
    const score = await prisma.score.create({ data });
    // revalidatePath("/scores");
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
    revalidatePath("/scores");
    return { data: score };
  } catch (error) {
    console.error("Score update failed:", error);
    return { error: "Failed to update score" };
  }
}

// Delete - Single
export async function deleteScore(id: string) {
  try {
    const score = await prisma.score.delete({
      where: { id },
    });
    revalidatePath("/scores");
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
    revalidatePath("/scores");
    return { data: result };
  } catch (error) {
    console.error("Score delete failed:", error);
    return { error: "Failed to delete scores" };
  }
}
