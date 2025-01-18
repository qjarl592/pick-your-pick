import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth";
import prisma from "@/lib/supabase/prisma";

interface Props {
  params: { slug: string };
}

// UUID 유효성 검사 함수
function isValidUUID(uuid: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export async function GET(request: NextRequest, { params }: Props) {
  const { slug: scoreId } = params;
  try {
    const session = await getServerSession(authOptions);

    if (!isValidUUID(scoreId)) {
      return NextResponse.json({ error: "Invalid score ID format" }, { status: 400 });
    }

    const score = await prisma.score.findUnique({
      where: { id: scoreId },
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "401 Not Found" }, { status: 401 });
    }

    if (!score) {
      return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
    }

    if (score.userId !== session.user.id) {
      return NextResponse.json({ error: "403 Forbidden" }, { status: 403 });
    }

    return NextResponse.json(score);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
