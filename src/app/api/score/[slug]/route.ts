import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import prisma from "@/lib/supabase/prisma";

interface Props {
  params: { slug: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const { slug: scoreId } = params;
  try {
    console.log("1. API called with params:", params);

    const session = await getServerSession(authOptions);
    console.log("2. Session:", session);

    const score = await prisma.score.findUnique({
      where: { id: scoreId },
    }); // 먼저 단순 쿼리로 테스트
    console.log("3. Score:", score);

    if (!session || !session.user) {
      return NextResponse.json({ error: "401 Not Found" }, { status: 401 });
    }

    if (!score) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    if (score.userId !== session.user.id) {
      return NextResponse.json({ error: "403 Forbidden" }, { status: 403 });
    }

    console.log("hrer");

    return NextResponse.json(score);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
