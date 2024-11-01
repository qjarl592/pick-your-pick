import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword") + "";

    const queryOptions: Prisma.TabFindManyArgs = {
      select: {
        id: true,
        title: true,
        artist: true,
        thumbnail_url: true,
        audio_url: true,
        tab_url: true,
      },
      where: {
        OR: [
          {
            title: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            artist: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      },
    };

    const tabSearch = await prisma.tab.findMany(queryOptions as Prisma.TabFindManyArgs);
    return NextResponse.json({ result: tabSearch }, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error fetching tab samples" }, { status: 500 });
  }
}
