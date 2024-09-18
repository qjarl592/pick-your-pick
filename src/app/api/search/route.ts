import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword");

    const queryOptions: Prisma.TabFindManyArgs | Prisma.Tab_SampleFindFirstArgs = {
      select: {
        id: true,
        title: true,
        artist: true,
        thumbnail_url: true,
      },
    };
    if (keyword?.length) {
      queryOptions.where = {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
        artist: {
          contains: keyword,
          mode: "insensitive",
        },
      };
      const tabSearch = await prisma.tab.findMany(queryOptions as Prisma.TabFindManyArgs);
      return NextResponse.json({ result: tabSearch }, { status: 200 });
    } else {
      const tabSample = await prisma.tab_Sample.findMany(queryOptions as Prisma.Tab_SampleFindManyArgs);
      return NextResponse.json({ result: tabSample }, { status: 200 });
    }
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error fetching tab samples" }, { status: 500 });
  }
}
