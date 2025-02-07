import { NextResponse } from "next/server";

import prisma from "@/lib/supabase/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const scores = await prisma.score.findMany({
    where: { userId: userId },
  });

  return NextResponse.json(scores);
}
