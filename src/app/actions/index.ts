"use server";

import { Prisma } from "@prisma/client";

import {
  getFirstScore,
  getScores,
  updateScore,
  updateScoreWithPdf,
  deleteScore,
  deleteManyScores,
  getScore,
  createScore,
} from "./score";

type TableName = "score";

// 모델별 입력 타입 매핑
type PrismaModelTypes = {
  score: {
    create: Prisma.ScoreCreateInput;
    update: Prisma.ScoreUpdateInput;
    where: Prisma.ScoreWhereInput;
    orderBy: Prisma.ScoreOrderByWithRelationInput;
  };
  // 새로운 모델을 추가할 때마다 여기에 타입을 추가
};

// Create
export async function create<T extends TableName>(table: T, data: PrismaModelTypes[T]["create"]) {
  switch (table) {
    case "score":
      return createScore(data);
    default:
      return { error: "Invalid table name" };
  }
}

// Get Unique
export async function getUnique<T extends TableName>(table: T, id: string) {
  switch (table) {
    case "score":
      return getScore(id);
    default:
      return { error: "Invalid table name" };
  }
}

// Get First
export async function getFirst<T extends TableName>(table: T, where: PrismaModelTypes[T]["where"]) {
  switch (table) {
    case "score":
      return getFirstScore(where as Prisma.ScoreWhereInput);
    default:
      return { error: "Invalid table name" };
  }
}

// Get Many
export async function getMany<T extends TableName>(
  table: T,
  params: {
    where?: PrismaModelTypes[T]["where"];
    orderBy?: PrismaModelTypes[T]["orderBy"];
  }
) {
  switch (table) {
    case "score":
      return getScores(
        params as {
          where?: Prisma.ScoreWhereInput;
          orderBy?: Prisma.ScoreOrderByWithRelationInput;
        }
      );
    default:
      return { error: "Invalid table name" };
  }
}

// Update
export async function update<T extends TableName>(table: T, id: string, data: PrismaModelTypes[T]["update"]) {
  switch (table) {
    case "score":
      return updateScore(id, data as Prisma.ScoreUpdateInput);
    default:
      return { error: "Invalid table name" };
  }
}

// Update with PDF
export async function updateWithPdf<T extends TableName>(table: T, id: string, formData: FormData) {
  switch (table) {
    case "score":
      return updateScoreWithPdf(id, formData);
    default:
      return { error: "Invalid table name" };
  }
}

// Delete Single
export async function deleteOne<T extends TableName>(table: T, id: string) {
  switch (table) {
    case "score":
      return deleteScore(id);
    default:
      return { error: "Invalid table name" };
  }
}

// Delete Many
export async function deleteMany<T extends TableName>(table: T, where: PrismaModelTypes[T]["where"]) {
  switch (table) {
    case "score":
      return deleteManyScores(where as Prisma.ScoreWhereInput);
    default:
      return { error: "Invalid table name" };
  }
}
